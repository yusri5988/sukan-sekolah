<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventParticipant;
use App\Models\House;
use App\Models\Meet;
use App\Models\Result;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ResultService
{
    /**
     * Get results for an event
     */
    public function getResults(Event $event): Collection
    {
        return $event->results()->with(['house', 'participant.student'])->orderBy('position')->get();
    }

    /**
     * Store or update a result and update house points
     */
    public function saveResult(Event $event, array $data): Result
    {
        return DB::transaction(function () use ($event, $data) {
            $meet = $event->meet;
            $points = $meet?->getPointsForPosition((int) $data['position']) ?? 0;

            $participantId = $data['event_participant_id'] ?? null;
            $houseId = $data['house_id'];

            // If participant is provided, get the house from the participant
            if ($participantId) {
                $participant = EventParticipant::findOrFail($participantId);
                $houseId = $participant->house_id;
            }

            $result = Result::updateOrCreate(
                [
                    'event_id' => $event->id,
                    'event_participant_id' => $participantId,
                ],
                [
                    'house_id' => $houseId,
                    'position' => $data['position'],
                    'points' => $points,
                    'time_record' => $data['time_record'] ?? null,
                    'notes' => $data['notes'] ?? null,
                    'is_verified' => $data['is_verified'] ?? false,
                    'is_locked' => $data['is_locked'] ?? false,
                ]
            );

            $this->recalculateHousePoints($event->sekolah_id);

            return $result->fresh();
        });
    }

    /**
     * Delete result
     */
    public function deleteResult(Result $result): bool
    {
        if ($result->is_locked) {
            abort(422, 'Keputusan telah dikunci dan tidak boleh dipadam.');
        }

        return DB::transaction(function () use ($result) {
            $sekolahId = $result->event->sekolah_id;
            $deleted = $result->delete();
            $this->recalculateHousePoints($sekolahId);

            return $deleted;
        });
    }

    /**
     * Lock or unlock a result
     */
    public function toggleLock(Result $result): Result
    {
        $result->update(['is_locked' => ! $result->is_locked]);
        $this->recalculateHousePoints($result->event->sekolah_id);

        return $result->fresh();
    }

    /**
     * Get live ranking for a meet
     */
    public function getRanking(Meet $meet): Collection
    {
        return House::query()
            ->where('sekolah_id', $meet->sekolah_id)
            ->withCount('students')
            ->orderByDesc('points')
            ->orderBy('name')
            ->get();
    }

    /**
     * Recalculate all house points for a sekolah based on locked results
     */
    public function recalculateHousePoints(int $sekolahId): void
    {
        $houses = House::where('sekolah_id', $sekolahId)->get()->keyBy('id');

        foreach ($houses as $house) {
            $house->update(['points' => 0]);
        }

        $results = Result::query()
            ->whereHas('event', fn ($q) => $q->where('sekolah_id', $sekolahId))
            ->where('is_locked', true)
            ->get();

        foreach ($results as $result) {
            $house = $houses->get($result->house_id);
            if ($house) {
                $house->increment('points', $result->points);
            }
        }
    }
}
