<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventParticipant;
use App\Models\House;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CikguEventParticipantService
{
    public function __construct(
        private EventParticipantService $baseParticipantService
    ) {}

    /**
     * Get eligible students for an event, filtered by cikgu's house.
     * Hanya pelajar dari rumah cikgu yang akan dipaparkan.
     *
     * @throws HttpResponseException
     */
    public function getEligibleStudents(Event $event, User $cikgu): Collection
    {
        if (! $this->houseForCikgu($cikgu, $event)) {
            return collect();
        }

        $house = $this->houseForCikgu($cikgu, $event);

        return Student::query()
            ->where('sekolah_id', $event->sekolah_id)
            ->where('house_id', $house->id)
            ->whereNotNull('house_id')
            ->whereNotIn('id', $event->participants()->pluck('student_id'))
            ->with('house')
            ->orderBy('name')
            ->get()
            ->filter(fn (Student $student) => $this->baseParticipantService->isEligibleForEvent($student, $event))
            ->values();
    }

    /**
     * Get participants for an event, filtered by cikgu's house.
     * Cikgu hanya boleh melihat peserta dari rumahnya sendiri.
     */
    public function getParticipants(Event $event, User $cikgu): Collection
    {
        $house = $this->houseForCikgu($cikgu, $event);

        if (! $house) {
            return collect([]);
        }

        return $event->participants()
            ->where('house_id', $house->id)
            ->with(['student.house', 'house'])
            ->orderBy('lane_number')
            ->get();
    }

    /**
     * Bulk register students for an event.
     * Setiap pelajar mesti disemak semula - memang dari rumah cikgu.
     */
    public function bulkRegister(Event $event, User $cikgu, array $studentIds): array
    {
        $house = $this->houseForCikgu($cikgu, $event);

        if (! $house) {
            return [
                'created' => 0,
                'errors' => ['Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam.'],
            ];
        }

        $created = 0;
        $errors = [];

        // Semak max_participants jika ada
        $currentParticipantsCount = $event->participants()->count();
        $maxParticipants = $event->max_participants;

        foreach ($studentIds as $studentId) {
            // Check max participants limit
            if ($maxParticipants !== null && $maxParticipants > 0 && $currentParticipantsCount >= $maxParticipants) {
                $errors[] = 'Had maksimum peserta acara telah dicapai.';
                break;
            }

            $student = Student::find($studentId);

            if (! $student) {
                $errors[] = "Pelajar ID {$studentId} tidak dijumpai.";

                continue;
            }

            // Semakan Backend: Pastikan pelajar dari sekolah yang sama
            if ($student->sekolah_id !== $event->sekolah_id) {
                $errors[] = "{$student->name}: Pelajar bukan dari sekolah ini.";

                continue;
            }

            // Semakan Backend: Pastikan pelajar ada house
            if (! $student->house_id) {
                $errors[] = "{$student->name}: Pelajar tiada rumah sukan.";

                continue;
            }

            // Semakan Backend: Pastikan pelajar dari rumah cikgu
            if ($student->house_id !== $house->id) {
                $errors[] = "{$student->name}: Pelajar bukan dari rumah sukan anda.";

                continue;
            }

            // Semakan Backend: Pastikan pelajar layak ikut acara
            if (! $this->baseParticipantService->isEligibleForEvent($student, $event)) {
                $errors[] = "{$student->name}: Pelajar tidak layak untuk acara ini.";

                continue;
            }

            // Semak jika sudah didaftarkan
            $existing = EventParticipant::where('event_id', $event->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                $errors[] = "{$student->name}: Pelajar sudah didaftarkan.";

                continue;
            }

            try {
                DB::transaction(function () use ($event, $student) {
                    EventParticipant::create([
                        'event_id' => $event->id,
                        'student_id' => $student->id,
                        'house_id' => $student->house_id,
                        'lane_number' => null,
                        'heat' => null,
                        'status' => 'registered',
                    ]);
                });

                $created++;
                $currentParticipantsCount++;
            } catch (\Throwable $e) {
                $errors[] = "{$student->name}: {$e->getMessage()}";
            }
        }

        return [
            'created' => $created,
            'errors' => $errors,
        ];
    }

    /**
     * Check if student belongs to cikgu's house.
     */
    public function isStudentFromCikguHouse(Student $student, User $cikgu): bool
    {
        $house = $this->houseForCikgu($cikgu, $student->sekolah_id);

        if (! $house) {
            return false;
        }

        return $student->house_id === $house->id;
    }

    /**
     * Resolve a cikgu's house only if it still belongs to the same school.
     */
    private function houseForCikgu(User $cikgu, Event|int|null $context = null): ?House
    {
        if (! $cikgu->house_id) {
            return null;
        }

        $query = House::query()->whereKey($cikgu->house_id);

        if ($context instanceof Event) {
            $query->where('sekolah_id', $context->sekolah_id);
        } elseif (is_int($context)) {
            $query->where('sekolah_id', $context);
        }

        return $query->first();
    }
}
