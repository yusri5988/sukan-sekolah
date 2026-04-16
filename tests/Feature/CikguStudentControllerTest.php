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

    protected function createStudent(Sekolah $school, ?House $house = null, array $attributes = []): Student
    {
        return Student::create(array_merge([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => 'Test Student',
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => 'L',
        ], $attributes));
    }

    public function test_cikgu_with_house_can_view_students_index(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Students/Index')
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_cikgu_without_house_cannot_view_students_index(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertRedirect(route('cikgu.dashboard'));
    }

    public function test_cikgu_with_house_can_see_own_house_students_only(): void
    {
        $school = $this->createSchool();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->createCikgu($school, $houseMerah);
        $studentMerah = $this->createStudent($school, $houseMerah, ['name' => 'Student Merah']);
        $this->createStudent($school, $houseBiru, ['name' => 'Student Biru']);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('students', 1)
            ->where('students.0.name', $studentMerah->name)
        );
    }

    public function test_cikgu_with_house_can_view_create_form(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Students/Create')
            ->where('myHouse.id', $house->id)
        );
    }

    public function test_cikgu_without_house_cannot_view_create_form(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertRedirect(route('cikgu.dashboard'));
    }

    public function test_create_form_shows_unassigned_students_only(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $eligible = $this->createStudent($school, null, ['name' => 'Unassigned Student']);
        $this->createStudent($school, $house, ['name' => 'Assigned Student']);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('unassignedStudents', 1)
            ->where('unassignedStudents.0.name', $eligible->name)
        );
    }

    public function test_create_form_supports_year_and_class_filters(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $matching = $this->createStudent($school, null, ['name' => 'Filtered Student', 'year' => 3, 'class' => '3A']);
        $this->createStudent($school, null, ['name' => 'Other Student', 'year' => 4, 'class' => '4A']);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.create', ['year' => 3, 'class' => '3A']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('unassignedStudents', 1)
            ->where('unassignedStudents.0.name', $matching->name)
            ->where('filterYear', '3')
            ->where('filterClass', '3A')
        );
    }

    public function test_cikgu_can_assign_multiple_unassigned_students_to_own_house(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Mercury']);
        $cikgu = $this->createCikgu($school, $house);
        $student1 = $this->createStudent($school, null, ['name' => 'Student One']);
        $student2 = $this->createStudent($school, null, ['name' => 'Student Two']);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$student1->id, $student2->id],
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', ['id' => $student1->id, 'house_id' => $house->id]);
        $this->assertDatabaseHas('students', ['id' => $student2->id, 'house_id' => $house->id]);
    }

    public function test_cannot_manipulate_assignment_for_student_from_other_school(): void
    {
        $schoolA = $this->createSchool();
        $schoolB = $this->createSchool();
        $houseA = House::factory()->create(['sekolah_id' => $schoolA->id, 'name' => 'Merah']);
        $cikgu = $this->createCikgu($schoolA, $houseA);
        $foreignStudent = $this->createStudent($schoolB, null, ['name' => 'Foreign Student']);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$foreignStudent->id],
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', [
            'id' => $foreignStudent->id,
            'house_id' => null,
        ]);
    }

    public function test_cannot_reassign_student_who_already_has_house(): void
    {
        $school = $this->createSchool();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->createCikgu($school, $houseMerah);
        $assignedStudent = $this->createStudent($school, $houseBiru, ['name' => 'Assigned Student']);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$assignedStudent->id],
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', [
            'id' => $assignedStudent->id,
            'house_id' => $houseBiru->id,
        ]);
    }

    public function test_cikgu_without_house_cannot_store_student_assignments(): void
    {
        $school = $this->createSchool();
        $cikgu = $this->createCikgu($school, null);
        $student = $this->createStudent($school, null);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.dashboard'));
        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'house_id' => null,
        ]);
    }

    public function test_store_validation_requires_student_ids(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), []);

        $response->assertSessionHasErrors('student_ids');
    }

    public function test_store_validation_rejects_unknown_student_ids(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'student_ids' => [999999],
            ]);

        $response->assertSessionHasErrors('student_ids.0');
    }

    public function test_cikgu_dashboard_shortcut_shows_correct_house_name(): void
    {
        $school = $this->createSchool();
        $house = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Olympus']);
        $cikgu = $this->createCikgu($school, $house);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('myHouse.name', 'Olympus')
        );
    }
}
