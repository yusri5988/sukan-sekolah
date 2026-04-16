<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CikguDashboardTest extends TestCase
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

    protected function createStudent(Sekolah $school, ?House $house = null): Student
    {
        return Student::create([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => 'Test Student',
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => 'L',
        ]);
    }

    public function test_dashboard_displays_house_name_when_assigned()
    {
        $school = $this->createSchool();
        $house = House::factory()->create([
            'sekolah_id' => $school->id,
            'name' => 'Mercury',
        ]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse.name', 'Mercury')
        );
    }

    public function test_dashboard_shows_student_count_for_assigned_house()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $this->createStudent($school, $house);
        $this->createStudent($school, $house);
        $this->createStudent($school, $house);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('stats.total_students', 3)
        );
    }

    public function test_dashboard_shows_zero_students_when_house_has_no_students()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('stats.total_students', 0)
        );
    }

    public function test_dashboard_shows_student_count_zero_when_no_house_assigned()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('stats.total_students', 0)
            ->where('myHouse', null)
        );
    }

    public function test_dashboard_shows_notice_when_no_house_assigned()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse', null)
        );
    }

    public function test_dashboard_has_shortcut_to_students_list()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_dashboard_has_shortcut_to_event_registration_when_house_assigned()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_dashboard_does_not_crash_when_house_id_is_null()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
    }

    public function test_dashboard_shows_correct_total_houses_count()
    {
        $school = $this->createSchool();
        House::factory()->count(4)->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('stats.total_houses', 4)
        );
    }

    public function test_dashboard_shows_students_without_house_count()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $this->createStudent($school, $house);
        $this->createStudent($school, null);
        $this->createStudent($school, null);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('stats.students_without_house', 2)
        );
    }

    public function test_dashboard_hides_house_specific_stats_when_no_house_assigned()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        House::factory()->create(['sekolah_id' => $school->id, 'points' => 100]);
        $this->createStudent($school, $house);
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse', null)
            ->where('stats.total_students', 0)
        );
    }

    public function test_cikgu_without_house_can_still_view_dashboard()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Dashboard')
        );
    }

    public function test_dashboard_shows_clear_status_when_assigned_house_is_deleted()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $house->delete();

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse', null)
        );
    }

    public function test_dashboard_passes_sekolah_info()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('sekolah.id', $school->id)
        );
    }

    public function test_dashboard_contains_houses_ranking()
    {
        $school = $this->createSchool();
        $house1 = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Alpha', 'points' => 100]);
        $house2 = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Beta', 'points' => 50]);
        $cikgu = $this->createCikgu($school, $house1);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('houses', 2)
        );
    }
}
