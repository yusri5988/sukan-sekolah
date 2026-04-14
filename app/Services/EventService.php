<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Meet;
use Illuminate\Support\Facades\DB;

class EventService
{
    /**
     * Create a new event
     */
    public function createEvent(array $data, Meet $meet): Event
    {
        return DB::transaction(function () use ($data, $meet) {
            $maxOrder = $meet->events()->max('order') ?? 0;

            return Event::create([
                'sekolah_id' => $meet->sekolah_id,
                'meet_id' => $meet->id,
                'name' => $data['name'],
                'category' => $data['category'],
                'gender' => $data['gender'],
                'type' => $data['type'],
                'max_participants' => $data['max_participants'] ?? 1,
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
}
