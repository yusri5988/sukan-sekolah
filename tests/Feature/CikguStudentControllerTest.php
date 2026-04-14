<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CikguStudentControllerTest extends TestCase
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

    protected function createStudent(Sekolah $school, ?House $house = null, string $name = 'Test Student'): Student
    {
        return Student::create([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => $name,
            'ic_number' => '1234567890'.rand(1000, 9999),
            'class' => '1A',
            'year' => 1,
            'gender' => 'male',
            'date_of_birth' => '2015-01-01',
        ]);
    }

    public function test_cikgu_with_house_can_view_students_index()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Students/Index')
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_cikgu_without_house_cannot_view_students_index()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertRedirect(route('cikgu.dashboard'));
    }

    public function test_cikgu_with_house_can_see_own_house_students_only()
    {
        $school = $this->createSchool();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->createCikgu($school, $houseMerah);

        $studentMerah = $this->createStudent($school, $houseMerah, 'Student Merah');
        $studentBiru = $this->createStudent($school, $houseBiru, 'Student Biru');

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertStatus(200);
        $response->assertSee($studentMerah->name, false);
        $response->assertDontSee($studentBiru->name, false);
    }

    public function test_cikgu_with_house_can_view_create_form()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Students/Create')
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_cikgu_without_house_cannot_view_create_form()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertRedirect(route('cikgu.dashboard'));
    }

    public function test_cikgu_can_store_student_with_auto_assigned_house()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Ahmad Bin Ali',
                'ic_number' => '123456789012',
                'class' => '1A',
                'year' => 1,
                'gender' => 'male',
                'date_of_birth' => '2015-01-01',
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', [
            'name' => 'Ahmad Bin Ali',
            'ic_number' => '123456789012',
            'house_id' => $house->id,
            'sekolah_id' => $school->id,
        ]);
    }

    public function test_cikgu_student_auto_assigned_to_teachers_house()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Mercury']);
        $cikgu = $this->createCikgu($school, $house);

        $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Test Student',
                'ic_number' => '999999999999',
                'class' => '2B',
                'year' => 3,
                'gender' => 'male',
                'date_of_birth' => '2015-01-01',
            ]);

        $student = Student::where('ic_number', '999999999999')->first();
        $this->assertEquals($house->id, $student->house_id);
        $this->assertEquals('Mercury', $student->house->name);
    }

    public function test_cannot_manipulate_house_id_through_request()
    {
        $school = $this->createSchool();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->createCikgu($school, $houseMerah);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Test Student',
                'ic_number' => '123456789555',
                'class' => '1A',
                'year' => 1,
                'gender' => 'male',
                'date_of_birth' => '2015-01-01',
                'house_id' => $houseBiru->id,
            ]);

        $student = Student::where('ic_number', '123456789555')->first();
        $this->assertEquals($houseMerah->id, $student->house_id);
        $this->assertNotEquals($houseBiru->id, $student->house_id);
    }

    public function test_cikgu_without_house_cannot_store_student()
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Test Student',
                'ic_number' => '123456789666',
                'class' => '1A',
                'year' => 1,
                'gender' => 'male',
                'date_of_birth' => '2015-01-01',
            ]);

        $response->assertStatus(302);
        $response->assertRedirectContains('cikgu');
        $this->assertDatabaseMissing('students', ['ic_number' => '123456789666']);
    }

    public function test_store_validation_name_required()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'ic_number' => '123456789777',
                'class' => '1A',
                'year' => 1,
            ]);

        $response->assertSessionHasErrors('name');
    }

    public function test_store_validation_ic_number_unique()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $this->createStudent($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Another Student',
                'ic_number' => $school->students->first()->ic_number,
                'class' => '1A',
                'year' => 1,
            ]);

        $response->assertSessionHasErrors('ic_number');
    }

    public function test_store_validation_year_between_1_and_6()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Test Student',
                'ic_number' => '123456789888',
                'class' => '1A',
                'year' => 7,
            ]);

        $response->assertSessionHasErrors('year');
    }

    public function test_store_validation_class_required()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Test Student',
                'ic_number' => '123456789999',
                'year' => 1,
            ]);

        $response->assertSessionHasErrors('class');
    }

    public function test_cikgu_cannot_see_other_house_students()
    {
        $school = $this->createSchool();
        $houseA = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Alpha']);
        $houseB = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Beta']);
        $cikguAlpha = $this->createCikgu($school, $houseA);

        $studentAlpha = $this->createStudent($school, $houseA, 'Student Alpha');
        $studentBeta = $this->createStudent($school, $houseB, 'Student Beta');

        $response = $this->actingAs($cikguAlpha)
            ->get(route('cikgu.students.index'));

        $response->assertStatus(200);
        $response->assertSee($studentAlpha->name, false);
        $response->assertDontSee($studentBeta->name, false);
    }

    public function test_cikgu_dashboard_shortcut_shows_correct_house_name()
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Olympus']);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse.name', 'Olympus')
        );
    }
}
