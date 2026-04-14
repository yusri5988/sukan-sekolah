<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeacherAssignmentFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdmin(Sekolah $school): User
    {
        return User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $school->id,
        ]);
    }

    public function test_admin_can_view_assignments_page()
    {
        $school = Sekolah::factory()->create();
        $admin = $this->createAdmin($school);

        $houses = House::factory()->count(2)->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $houses->first()->id,
        ]);

        $response = $this->actingAs($admin)
            ->get(route('admin-sekolah.teachers.assignments.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Teachers/Assignments')
            ->has('teachers', 1)
            ->has('houses', 2)
        );
    }

    public function test_admin_can_assign_teacher_to_house()
    {
        $school = Sekolah::factory()->create();
        $admin = $this->createAdmin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => null,
        ]);

        $response = $this->actingAs($admin)
            ->patch(route('admin-sekolah.teachers.assignment.update', $teacher->id), [
                'house_id' => $house->id,
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('users', [
            'id' => $teacher->id,
            'house_id' => $house->id,
        ]);
    }

    public function test_admin_cannot_assign_teacher_from_another_school()
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminA = $this->createAdmin($schoolA);
        $houseA = House::factory()->create(['sekolah_id' => $schoolA->id]);
        $teacherB = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $schoolB->id,
        ]);

        $response = $this->actingAs($adminA)
            ->patch(route('admin-sekolah.teachers.assignment.update', $teacherB->id), [
                'house_id' => $houseA->id,
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_cannot_assign_teacher_to_house_of_another_school()
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminA = $this->createAdmin($schoolA);
        $houseB = House::factory()->create(['sekolah_id' => $schoolB->id]);
        $teacherA = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $schoolA->id,
        ]);

        $response = $this->actingAs($adminA)
            ->patch(route('admin-sekolah.teachers.assignment.update', $teacherA->id), [
                'house_id' => $houseB->id,
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_unassign_teacher()
    {
        $school = Sekolah::factory()->create();
        $admin = $this->createAdmin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $house->id,
        ]);

        $response = $this->actingAs($admin)
            ->patch(route('admin-sekolah.teachers.assignment.update', $teacher->id), [
                'house_id' => null,
            ]);

        $response->assertOk();
        $this->assertDatabaseHas('users', [
            'id' => $teacher->id,
            'house_id' => null,
        ]);
    }
}
