<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\House;
use App\Models\Meet;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationOwnershipSmokeTest extends TestCase
{
    use RefreshDatabase;

    private function school(): Sekolah
    {
        return Sekolah::factory()->create();
    }

    private function admin(Sekolah $school): User
    {
        return User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $school->id,
        ]);
    }

    private function cikgu(Sekolah $school, ?House $house = null): User
    {
        return User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
        ]);
    }

    private function student(Sekolah $school, ?House $house, string $name, string $gender = 'male', int $age = 8): Student
    {
        return Student::create([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => $name,
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => $gender,
            'date_of_birth' => now()->subYears($age),
        ]);
    }

    private function meet(Sekolah $school): Meet
    {
        return Meet::create([
            'sekolah_id' => $school->id,
            'name' => 'Sukan Tahunan',
            'date' => now()->addDays(7),
            'status' => Meet::STATUS_ACTIVE,
        ]);
    }

    private function event(Sekolah $school, Meet $meet, array $overrides = []): Event
    {
        return Event::create(array_merge([
            'sekolah_id' => $school->id,
            'name' => '100m Lelaki',
            'category' => Event::CATEGORY_7_9,
            'gender' => Event::GENDER_MALE,
            'type' => Event::TYPE_INDIVIDUAL,
            'max_participants' => 10,
            'is_active' => true,
            'order' => 1,
        ], $overrides));
    }

    public function test_admin_sekolah_can_see_assignment_page(): void
    {
        $school = $this->school();
        $admin = $this->admin($school);
        House::factory()->count(2)->create(['sekolah_id' => $school->id]);

        $response = $this->actingAs($admin)
            ->get(route('admin-sekolah.teachers.assignments.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Teachers/Assignments')
            ->has('teachers')
            ->has('houses', 2)
        );
    }

    public function test_admin_sekolah_can_assign_teacher_to_own_school_house(): void
    {
        $school = $this->school();
        $admin = $this->admin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
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

    public function test_admin_sekolah_cannot_assign_teacher_to_other_school_house(): void
    {
        $schoolA = $this->school();
        $schoolB = $this->school();
        $admin = $this->admin($schoolA);
        $houseB = House::factory()->create(['sekolah_id' => $schoolB->id]);
        $teacherA = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $schoolA->id,
        ]);

        $response = $this->actingAs($admin)
            ->patch(route('admin-sekolah.teachers.assignment.update', $teacherA->id), [
                'house_id' => $houseB->id,
            ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('users', [
            'id' => $teacherA->id,
            'house_id' => $houseB->id,
        ]);
    }

    public function test_cikgu_can_only_see_students_from_own_house(): void
    {
        $school = $this->school();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->cikgu($school, $houseMerah);

        $merah = $this->student($school, $houseMerah, 'Pelajar Merah');
        $this->student($school, $houseBiru, 'Pelajar Biru');

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.students.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Students/Index')
            ->has('students', 1)
            ->where('students.0.name', $merah->name)
            ->where('myHouse.id', $houseMerah->id)
        );
    }

    public function test_cikgu_cannot_create_student_for_other_house_via_request(): void
    {
        $school = $this->school();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->cikgu($school, $houseMerah);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.students.store'), [
                'name' => 'Pelajar Ujian',
                'ic_number' => '999999999999',
                'class' => '1A',
                'year' => 1,
                'gender' => 'male',
                'date_of_birth' => '2015-01-01',
                'house_id' => $houseBiru->id,
            ]);

        $response->assertRedirect(route('cikgu.students.index'));
        $this->assertDatabaseHas('students', [
            'ic_number' => '999999999999',
            'house_id' => $houseMerah->id,
        ]);
    }

    public function test_cikgu_can_only_register_participants_from_own_house(): void
    {
        $school = $this->school();
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikgu = $this->cikgu($school, $houseMerah);
        $meet = $this->meet($school);
        $event = $this->event($school, $meet);

        $merah = $this->student($school, $houseMerah, 'Peserta Merah');
        $biru = $this->student($school, $houseBiru, 'Peserta Biru');

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$merah->id, $biru->id],
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $merah->id,
            'house_id' => $houseMerah->id,
        ]);
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $biru->id,
        ]);
    }

    public function test_cikgu_without_house_cannot_use_house_management_flows(): void
    {
        $school = $this->school();
        $cikgu = $this->cikgu($school, null);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $meet = $this->meet($school);
        $event = $this->event($school, $meet);
        $student = $this->student($school, $house, 'Pelajar Tanpa Lantikan');

        $createResponse = $this->actingAs($cikgu)->post(route('cikgu.students.store'), [
            'name' => 'Pelajar Baru',
            'ic_number' => '888888888888',
            'class' => '1A',
            'year' => 1,
            'gender' => 'male',
            'date_of_birth' => '2015-01-01',
        ]);

        $participantResponse = $this->actingAs($cikgu)->post(route('cikgu.events.participants.store', $event->id), [
            'student_ids' => [$student->id],
        ]);

        $createResponse->assertRedirect(route('cikgu.dashboard'));
        $participantResponse->assertRedirect(route('cikgu.dashboard'));
        $this->assertDatabaseMissing('students', ['ic_number' => '888888888888']);
        $this->assertDatabaseMissing('event_participants', ['student_id' => $student->id]);
    }
}
