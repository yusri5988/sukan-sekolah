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
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $sekolah->id,
        ]);
    }

    /**
     * Delete a teacher
     */
    public function deleteTeacher(User $teacher, Sekolah $sekolah): bool
    {
        // Ensure the teacher belongs to the school
        if ($teacher->sekolah_id !== $sekolah->id || ! $teacher->isCikgu()) {
            throw new \Exception('Unauthorized action.');
        }

        return $teacher->delete();
    }
}
