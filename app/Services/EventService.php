<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventTemplate;
use App\Models\Meet;
use App\Models\ScoringRule;
use Illuminate\Support\Facades\DB;

class EventService
{
    /**
     * Create a new event from template
     */
    public function createEventFromTemplate(array $data, Meet $meet): Event
    {
        return DB::transaction(function () use ($data, $meet) {
            $template = EventTemplate::findOrFail($data['event_template_id']);
            $maxOrder = $meet->events()->max('order') ?? 0;

            return Event::create([
                'sekolah_id' => $meet->sekolah_id,
                'meet_id' => $meet->id,
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
            ]);
        });
    }

    /**
     * Create multiple events from selected templates
     */
    public function createEventsFromTemplates(array $templateIds, Meet $meet): array
    {
        $createdEvents = [];

        foreach ($templateIds as $templateId) {
            $createdEvents[] = $this->createEventFromTemplate([
                'event_template_id' => $templateId,
            ], $meet);
        }

        return $createdEvents;
    }

    /**
     * Create a new event (legacy method for custom events)
     */
    public function createEvent(array $data, Meet $meet): Event
    {
        return DB::transaction(function () use ($data, $meet) {
            $maxOrder = $meet->events()->max('order') ?? 0;

            return Event::create([
                'sekolah_id' => $meet->sekolah_id,
                'meet_id' => $meet->id,
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
        $event->update($data);

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
    public function reorderEvents(Meet $meet, array $eventIds): void
    {
        foreach ($eventIds as $order => $eventId) {
            Event::where('id', $eventId)
                ->where('meet_id', $meet->id)
                ->update(['order' => $order + 1]);
        }
    }

    /**
     * Get events for a meet
     */
    public function getEventsForMeet(Meet $meet)
    {
        return $meet->events()
            ->with('eventCategory')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get events grouped by category
     */
    public function getEventsGroupedByCategory(Meet $meet)
    {
        $events = $this->getEventsForMeet($meet);

        return $events->groupBy('category')->map(function ($group) {
            return $group->groupBy('gender');
        });
    }

    /**
     * Get all available event templates grouped by category
     */
    public function getTemplatesGroupedByCategory()
    {
        $categories = EventCategory::where('is_active', true)
            ->orderBy('order')
            ->with(['templates' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('order');
            }])
            ->get();

        return $categories;
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
