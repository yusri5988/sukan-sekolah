<?php

namespace App\Services;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class HouseService
{
    /**
     * Create a new house for a sekolah
     */
    public function createHouse(array $data, Sekolah $sekolah): House
    {
        return DB::transaction(function () use ($data, $sekolah) {
            return House::create([
                'sekolah_id' => $sekolah->id,
                'name' => $data['name'],
                'color' => $data['color'] ?? null,
                'logo' => $data['logo'] ?? null,
                'points' => 0,
            ]);
        });
    }

    /**
     * Delete a house
     */
    public function deleteHouse(House $house): bool
    {
        if ($house->students()->exists()) {
            return false;
        }

        return $house->delete();
    }

    /**
     * Get houses for a sekolah with student count
     */
    public function getHousesWithStudentCount(Sekolah $sekolah)
    {
        return $sekolah->houses()->withCount('students')->get();
    }

    /**
     * Get houses for a sekolah with student count and teachers
     */
    public function getHousesWithCounts(Sekolah $sekolah)
    {
        return $sekolah->houses()
            ->withCount('students')
            ->with(['teachers' => function ($query) {
                $query->select('id', 'name', 'email', 'house_id');
            }])
            ->get();
    }

    /**
     * Assign a student to a house
     */
    public function assignStudentToHouse(Student $student, House $house): Student
    {
        $student->update(['house_id' => $house->id]);

        return $student->fresh();
    }

    /**
     * Auto-assign students to houses (balanced distribution)
     */
    public function autoAssignStudentsToHouses(Sekolah $sekolah): array
    {
        $houses = $sekolah->houses()->withCount('students')->get();

        if ($houses->isEmpty()) {
            return ['success' => false, 'message' => 'Tiada rumah sukan wujud'];
        }

        $studentsWithoutHouse = $sekolah->students()
            ->whereNull('house_id')
            ->orderBy('id')
            ->get(['id']);

        if ($studentsWithoutHouse->isEmpty()) {
            return ['success' => false, 'message' => 'Semua pelajar sudah mempunyai rumah'];
        }

        $assignments = [];
        $houseCounts = $houses->mapWithKeys(function (House $house) {
            return [$house->id => (int) $house->students_count];
        })->all();

        $assignedCount = 0;

        foreach ($studentsWithoutHouse as $student) {
            asort($houseCounts);
            $houseId = array_key_first($houseCounts);

            $assignments[$houseId][] = $student->id;
            $houseCounts[$houseId]++;
            $assignedCount++;
        }

        DB::transaction(function () use ($assignments) {
            foreach ($assignments as $houseId => $studentIds) {
                Student::whereIn('id', $studentIds)->update(['house_id' => $houseId]);
            }
        });

        return [
            'success' => true,
            'assigned_count' => $assignedCount,
            'message' => "Berjaya assign {$assignedCount} pelajar ke rumah sukan",
        ];
    }
}
