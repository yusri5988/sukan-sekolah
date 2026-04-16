<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CikguAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function createSchool(): Sekolah
    {
        return Sekolah::factory()->create();
    }

    protected function createCikgu(Sekolah $school, ?House $house = null): User
    {
        return User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
        ]);
    }

    protected function createAdminSekolah(Sekolah $school): User
    {
        return User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $school->id,
        ]);
    }

    protected function createStudent(Sekolah $school, ?House $house = null, array $attributes = []): Student
    {
        return Student::create(array_merge([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => 'Ahmad Bin Ali',
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => 'L',
        ], $attributes));
    }

    public function test_cikgu_can_access_cikgu_dashboard(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertOk();
    }

    public function test_cikgu_can_access_students_index(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertOk();
    }

    public function test_cikgu_can_access_student_create_page(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertOk();
    }

    public function test_cikgu_can_assign_unassigned_student_to_own_house(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $student = $this->createStudent($school, null);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'house_id' => $house->id,
        ]);
    }

    public function test_cikgu_cannot_assign_student_if_assigned_house_was_deleted(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $student = $this->createStudent($school, null);

        $house->delete();

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.dashboard'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'house_id' => null,
        ]);
    }

    public function test_admin_sekolah_cannot_access_cikgu_routes(): void
    {
        $school = $this->createSchool();
        $admin = $this->createAdminSekolah($school);

        $response = $this->actingAs($admin)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(403);
    }

    public function test_cikgu_without_sekolah_cannot_access_cikgu_routes(): void
    {
        $cikgu = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => null,
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(403);
    }

    public function test_cikgu_cannot_access_admin_sekolah_routes(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school);

        $response = $this->actingAs($cikgu)
            ->get(route('admin-sekolah.dashboard'));

        $response->assertStatus(403);
    }

    public function test_dashboard_redirects_cikgu_to_cikgu_dashboard(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school);

        $response = $this->actingAs($cikgu)
            ->get(route('dashboard'));

        $response->assertRedirect(route('cikgu.dashboard'));
    }

    public function test_cikgu_dashboard_shows_house_info_when_assigned(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Dashboard')
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_cikgu_dashboard_shows_no_house_when_not_assigned(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Dashboard')
            ->where('myHouse', null)
        );
    }
}
