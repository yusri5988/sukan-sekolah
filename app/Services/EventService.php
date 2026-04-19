<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventTemplate;
use App\Models\ScoringRule;
use App\Models\Sekolah;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class EventService
{
    /**
     * Create a new event from template
     */
    public function createEventFromTemplate(array $data, Sekolah $sekolah): Event
    {
        return DB::transaction(function () use ($data, $sekolah) {
            $template = EventTemplate::findOrFail($data['event_template_id']);
            $maxOrder = Event::query()->where('sekolah_id', $sekolah->id)->max('order') ?? 0;

            $settings = $data['settings'] ?? null;
            if ($settings && isset($settings['lane_count'])) {
                $settings = ['lane_count' => (int) $settings['lane_count']];
            }

            return Event::create([
                'sekolah_id' => $sekolah->id,
                'event_category_id' => $template->event_category_id,
                'event_template_id' => $template->id,
                'name' => $template->name,
                'category' => $template->category,
                'gender' => $template->gender,
                'type' => $template->type,
                'max_participants' => $template->max_participants,
                'has_qualifying_round' => $template->has_qualifying_round,
                'has_multiple_attempts' => $template->has_multiple_attempts,
                'attempts_count' => $template->attempts_count,
                'scheduled_time' => $data['scheduled_time'] ?? null,
                'scheduled_date' => $data['scheduled_date'] ?? null,
                'order' => $maxOrder + 1,
                'is_active' => true,
                'settings' => $settings,
            ]);
        });
    }

    /**
     * Create multiple events from selected templates
     */
    public function createEventsFromTemplates(array $templateIds, Sekolah $sekolah): array
    {
        $createdEvents = [];

        foreach ($templateIds as $templateId) {
            $createdEvents[] = $this->createEventFromTemplate([
                'event_template_id' => $templateId,
            ], $sekolah);
        }

        return $createdEvents;
    }

    /**
     * Create a new event (legacy method for custom events)
     */
    public function createEvent(array $data, Sekolah $sekolah): Event
    {
        return DB::transaction(function () use ($data, $sekolah) {
            $maxOrder = Event::query()->where('sekolah_id', $sekolah->id)->max('order') ?? 0;

            return Event::create([
                'sekolah_id' => $sekolah->id,
                'event_category_id' => $data['event_category_id'] ?? null,
                'name' => $data['name'],
                'category' => $data['category'],
                'gender' => $data['gender'],
                'type' => $data['type'],
                'max_participants' => $data['max_participants'] ?? 1,
                'has_qualifying_round' => $data['has_qualifying_round'] ?? false,
                'has_multiple_attempts' => $data['has_multiple_attempts'] ?? false,
                'attempts_count' => $data['attempts_count'] ?? 1,
                'scheduled_time' => $data['scheduled_time'] ?? null,
                'scheduled_date' => $data['scheduled_date'] ?? null,
                'order' => $maxOrder + 1,
                'is_active' => true,
            ]);
        });
    }

    /**
     * Update event details
     */
    public function updateEvent(Event $event, array $data): Event
    {
        $settings = array_merge($event->settings ?? [], $data['settings'] ?? []);

        if (isset($settings['lane_count'])) {
            $settings['lane_count'] = (int) $settings['lane_count'];
        }

        if (isset($settings['max_participants_per_house'])) {
            $settings['max_participants_per_house'] = (int) $settings['max_participants_per_house'];
        }

        $event->fill(Arr::except($data, ['settings']));
        $event->settings = $settings;
        $event->save();

        return $event->fresh();
    }

    /**
     * Toggle event active status
     */
    public function toggleActive(Event $event): Event
    {
        $event->update(['is_active' => ! $event->is_active]);

        return $event->fresh();
    }

    /**
     * Delete an event
     */
    public function deleteEvent(Event $event): bool
    {
        return $event->delete();
    }

    /**
     * Reorder events within a meet
     */
    public function reorderEvents(Sekolah $sekolah, array $eventIds): void
    {
        foreach ($eventIds as $order => $eventId) {
            Event::where('id', $eventId)
                ->where('sekolah_id', $sekolah->id)
                ->update(['order' => $order + 1]);
        }
    }

    /**
     * Get events for a meet
     */
    public function getEventsForSekolah(Sekolah $sekolah)
    {
        return Event::query()
            ->where('sekolah_id', $sekolah->id)
            ->with('eventCategory')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get events grouped by category
     */
    public function getEventsGroupedByCategory(Sekolah $sekolah)
    {
        $events = $this->getEventsForSekolah($sekolah);

        return $events->groupBy('category')->map(function ($group) {
            return $group->groupBy('gender');
        });
    }

    /**
     * Get all available event templates grouped by category
     */
    public function getTemplatesGroupedByCategory($excludeQualifying = false)
    {
        $categories = EventCategory::where('is_active', true)
            ->orderBy('order')
            ->with(['templates' => function ($query) use ($excludeQualifying) {
                $query->where('is_active', true);

                if ($excludeQualifying) {
                    $query->where('has_qualifying_round', false);
                }

                $query->orderBy('order');
            }])
            ->get();

        return $categories;
    }

    /**
     * Get master templates (grouped by name and category)
     */
    public function getMasterTemplatesGroupedByCategory()
    {
        $categories = EventCategory::where('is_active', true)
            ->orderBy('order')
            ->get();

        return $categories->map(function ($category) {
            $templates = EventTemplate::where('event_category_id', $category->id)
                ->where('is_active', true)
                ->get();

            $category->master_templates = $templates->groupBy('name')->map(function ($items, $name) {
                return [
                    'name' => $name,
                    'type' => $items->first()->type,
                    'is_relay' => $items->first()->is_relay,
                    'has_qualifying_round' => $items->first()->has_qualifying_round,
                    'has_multiple_attempts' => $items->first()->has_multiple_attempts,
                    'attempts_count' => $items->first()->attempts_count,
                    'available_genders' => $items->pluck('gender')->unique()->values()->toArray(),
                    'available_categories' => $items->pluck('category')->unique()->values()->toArray(),
                    'template_ids' => $items->pluck('id')->toArray(),
                ];
            })->values();

            return $category;
        });
    }

    /**
     * Get specific templates by names and category filters
     */
    public function getTemplatesByNames(array $names)
    {
        return EventTemplate::whereIn('name', $names)
            ->where('is_active', true)
            ->get()
            ->groupBy('name');
    }

    /**
     * Get scoring rules for a category
     */
    public function getScoringRulesForCategory(int $categoryId, ?int $sekolahId = null)
    {
        $query = ScoringRule::where('event_category_id', $categoryId);

        if ($sekolahId) {
            $query->where(function ($q) use ($sekolahId) {
                $q->where('sekolah_id', $sekolahId)
                    ->orWhereNull('sekolah_id');
            });
        }

        return $query->orderBy('position')->get();
    }
}
