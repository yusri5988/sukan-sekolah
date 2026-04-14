<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventParticipant;
use App\Models\Student;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EventParticipantService
{
    /**
     * Get participants for an event
     */
    public function getParticipants(Event $event): Collection
    {
        return $event->participants()->with(['student.house', 'house'])->orderBy('lane_number')->get();
    }

    /**
     * Get eligible students for an event
     */
    public function getEligibleStudents(Event $event): Collection
    {
        return Student::query()
            ->where('sekolah_id', $event->sekolah_id)
            ->whereNotIn('id', $event->participants()->pluck('student_id'))
            ->with('house')
            ->orderBy('name')
            ->get()
            ->filter(fn (Student $student) => $this->isEligibleForEvent($student, $event))
            ->values();
    }

    /**
     * Register a single student to an event
     */
    public function registerStudent(Event $event, Student $student, array $data = []): EventParticipant
    {
        return DB::transaction(function () use ($event, $student, $data) {
            if ($student->sekolah_id !== $event->sekolah_id) {
                abort(403, 'Pelajar bukan dari sekolah ini.');
            }

            if (! $this->isEligibleForEvent($student, $event)) {
                abort(422, 'Pelajar tidak layak untuk acara ini.');
            }

            $existing = EventParticipant::where('event_id', $event->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                return $existing;
            }

            return EventParticipant::create([
                'event_id' => $event->id,
                'student_id' => $student->id,
                'house_id' => $student->house_id,
                'lane_number' => $data['lane_number'] ?? null,
                'heat' => $data['heat'] ?? null,
                'status' => $data['status'] ?? 'registered',
            ]);
        });
    }

    /**
     * Bulk register students
     */
    public function bulkRegister(Event $event, array $studentIds): array
    {
        $created = 0;
        $errors = [];

        foreach ($studentIds as $studentId) {
            $student = Student::find($studentId);

            if (! $student) {
                $errors[] = "Pelajar ID {$studentId} tidak dijumpai.";

                continue;
            }

            try {
                $this->registerStudent($event, $student);
                $created++;
            } catch (\Throwable $e) {
                $errors[] = $student->name.': '.$e->getMessage();
            }
        }

        return [
            'created' => $created,
            'errors' => $errors,
        ];
    }

    /**
     * Assign lane and heat
     */
    public function assignLane(EventParticipant $participant, int $laneNumber, ?int $heat = null): EventParticipant
    {
        $participant->update([
            'lane_number' => $laneNumber,
            'heat' => $heat,
            'status' => 'confirmed',
        ]);

        return $participant->fresh();
    }

    /**
     * Remove a participant from event
     */
    public function removeParticipant(EventParticipant $participant): bool
    {
        return (bool) $participant->delete();
    }

    /**
     * Check if student is eligible for event
     */
    public function isEligibleForEvent(Student $student, Event $event): bool
    {
        if ($event->category !== Event::CATEGORY_ALL && $student->age_category !== $event->category) {
            return false;
        }

        if ($event->gender === Event::GENDER_MALE && $student->gender !== 'male') {
            return false;
        }

        if ($event->gender === Event::GENDER_FEMALE && $student->gender !== 'female') {
            return false;
        }

        return true;
    }
}
