<?php

namespace App\Services;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class StudentService
{
    /**
     * Normalize gender value to L/P
     */
    private function normalizeGender(?string $value): string
    {
        if (in_array(strtolower($value), ['l', 'p', 'male', 'female', 'lelaki', 'perempuan'])) {
            return in_array(strtolower($value), ['p', 'female', 'perempuan']) ? 'P' : 'L';
        }

        return 'L';
    }

    /**
     * Create a single student
     */
    public function createStudent(array $data, Sekolah $sekolah): Student
    {
        return DB::transaction(function () use ($data, $sekolah) {
            return Student::create([
                'sekolah_id' => $sekolah->id,
                'house_id' => $data['house_id'] ?? null,
                'name' => $data['name'],
                'ic_number' => $data['ic_number'],
                'class' => $data['class'],
                'year' => $data['year'],
                'gender' => $data['gender'] ?? 'male',
            ]);
        });
    }

    /**
     * Create a student for a specific house (used by Cikgu)
     */
    public function createStudentForHouse(array $data, Sekolah $sekolah, int $houseId): Student
    {
        return DB::transaction(function () use ($data, $sekolah, $houseId) {
            $house = House::whereKey($houseId)
                ->where('sekolah_id', $sekolah->id)
                ->first();

            if (! $house) {
                throw new \InvalidArgumentException('Rumah sukan tidak sah atau telah dipadam.');
            }

            return Student::create([
                'sekolah_id' => $sekolah->id,
                'house_id' => $house->id,
                'name' => $data['name'],
                'ic_number' => $data['ic_number'],
                'class' => $data['class'],
                'year' => $data['year'],
                'gender' => $data['gender'] ?? 'male',
            ]);
        });
    }

    /**
     * Import students from array (for Excel/CSV import)
     */
    public function importStudents(array $rows, Sekolah $sekolah): array
    {
        $created = 0;
        $updated = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            try {
                // Skip if row is empty
                if (empty(array_filter($row))) {
                    continue;
                }

                // Validate required fields
                if (empty($row['name']) || empty($row['ic_number']) || empty($row['class']) || empty($row['year'])) {
                    $errors[] = [
                        'row' => $index + 1,
                        'message' => 'Missing required fields (name, ic_number, class, year)',
                    ];

                    continue;
                }

                // Check if student with same ic_number exists
                $existingStudent = Student::where('ic_number', $row['ic_number'])
                    ->where('sekolah_id', $sekolah->id)
                    ->first();

                if ($existingStudent) {
                    // Update existing student
                    $existingStudent->update([
                        'name' => $row['name'],
                        'class' => $row['class'],
                        'gender' => $this->normalizeGender($row['gender'] ?? $existingStudent->gender),
                        'house_id' => $row['house_id'] ?? $existingStudent->house_id,
                    ]);
                    $updated++;
                } else {
                    // Create new student
                    Student::create([
                        'sekolah_id' => $sekolah->id,
                        'house_id' => $row['house_id'] ?? null,
                        'name' => $row['name'],
                        'ic_number' => $row['ic_number'],
                        'class' => $row['class'],
                        'year' => $row['year'],
                        'gender' => $this->normalizeGender($row['gender'] ?? 'L'),
                    ]);
                    $created++;
                }
            } catch (\Exception $e) {
                $errors[] = [
                    'row' => $index + 1,
                    'message' => $e->getMessage(),
                ];
            }
        }

        return [
            'created' => $created,
            'updated' => $updated,
            'errors' => $errors,
        ];
    }

    /**
     * Update student details
     */
    public function updateStudent(Student $student, array $data): Student
    {
        $student->update($data);

        return $student->fresh();
    }

    /**
     * Delete a student
     */
    public function deleteStudent(Student $student): bool
    {
        return $student->delete();
    }

    /**
     * Get students for a sekolah with optional house filter
     */
    public function getStudents(Sekolah $sekolah, ?int $houseId = null)
    {
        $query = $sekolah->students()->with('house');

        if ($houseId) {
            $query->where('house_id', $houseId);
        }

        return $query->orderBy('name')->get();
    }

    /**
     * Get students without house assignment
     */
    public function getStudentsWithoutHouse(Sekolah $sekolah)
    {
        return $sekolah->students()->whereNull('house_id')->orderBy('name')->get();
    }

    /**
     * Bulk assign students to a house
     */
    public function bulkAssignToHouse(array $studentIds, House $house): int
    {
        return Student::whereIn('id', $studentIds)
            ->where('sekolah_id', $house->sekolah_id)
            ->update(['house_id' => $house->id]);
    }
}
