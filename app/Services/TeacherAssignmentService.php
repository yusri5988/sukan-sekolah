<?php

namespace App\Services;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use InvalidArgumentException;

/**
 * Service handling teacher (cikgu) house assignments.
 *
 * All validation logic is encapsulated here so controllers stay thin.
 */
class TeacherAssignmentService
{
    /**
     * Retrieve all teachers belonging to a given school together with their current house.
     */
    public function getTeachersWithHouse(Sekolah $school): Collection
    {
        return User::whereIn('role', User::teacherRoles())
            ->where('sekolah_id', $school->id)
            ->with('house')
            ->get();
    }

    /**
     * Ensure the provided user is a teacher (cikgu).
     */
    public function assertIsTeacher(User $user): void
    {
        if (! $user->isCikgu()) {
            throw new InvalidArgumentException('User is not a teacher (cikgu).');
        }
    }

    /**
     * Ensure teacher and house belong to the same school.
     */
    public function assertSameSchool(User $teacher, House $house): void
    {
        if ($teacher->sekolah_id !== $house->sekolah_id) {
            throw new InvalidArgumentException('Teacher and house belong to different schools.');
        }
    }

    /**
     * Assign a teacher to a house (or change existing assignment).
     */
    public function assign(User $teacher, House $house): void
    {
        $this->assertIsTeacher($teacher);
        $this->assertSameSchool($teacher, $house);

        $teacher->house_id = $house->id;
        $teacher->save();
    }

    /**
     * Remove a teacher's house assignment.
     */
    public function unassign(User $teacher): void
    {
        $this->assertIsTeacher($teacher);
        $teacher->house_id = null;
        $teacher->save();
    }
}
