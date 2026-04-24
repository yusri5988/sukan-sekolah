<?php

namespace App\Services;

use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;

class TeacherService
{
    /**
     * List all teachers for a given school with house information
     */
    public function listTeachers(Sekolah $sekolah): Collection
    {
        return $sekolah->cikgus()->with('house')->get();
    }

    /**
     * Create a new teacher for a school
     */
    public function createTeacher(Sekolah $sekolah, array $data): User
    {
        $validRoles = [
            User::ROLE_CIKGU,
            User::ROLE_CIKGU_SUKAN,
            User::ROLE_PENGURUS_ACARA,
            User::ROLE_PENGURUSAN_KEPUTUSAN,
        ];
        $role = in_array($data['role'] ?? null, $validRoles, true) ? $data['role'] : User::ROLE_CIKGU;

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $role,
            'sekolah_id' => $sekolah->id,
        ]);
    }

    /**
     * Delete a teacher
     */
    public function deleteTeacher(User $teacher, Sekolah $sekolah): bool
    {
        $validTeacherRoles = [
            User::ROLE_CIKGU,
            User::ROLE_CIKGU_SUKAN,
            User::ROLE_PENGURUS_ACARA,
            User::ROLE_PENGURUSAN_KEPUTUSAN,
        ];

        // Ensure the teacher belongs to the school
        if ($teacher->sekolah_id !== $sekolah->id || ! in_array($teacher->role, $validTeacherRoles, true)) {
            throw new \Exception('Unauthorized action.');
        }

        return $teacher->delete();
    }
}
