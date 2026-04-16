<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\EventParticipant;
use App\Models\House;
use App\Models\Meet;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CikguEventRegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function createSchool(): Sekolah
    {
        return Sekolah::factory()->create();
    }

    protected function createMeet(Sekolah $school): Meet
    {
        return Meet::create([
            'sekolah_id' => $school->id,
            'name' => 'Test Meet',
            'date' => now()->addDays(7),
            'status' => Meet::STATUS_ACTIVE,
        ]);
    }

    protected function createEventCategory(): EventCategory
    {
        return EventCategory::create([
            'name' => 'Balapan',
            'code' => 'track',
            'order' => 1,
            'is_active' => true,
        ]);
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
        $defaults = [
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => 'Test Student',
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => 'L',
        ];

        return Student::create(array_merge($defaults, $attributes));
    }

    protected function createEvent(Sekolah $school, array $attributes = []): Event
    {
        $defaults = [
            'sekolah_id' => $school->id,
            'event_category_id' => $this->createEventCategory()->id,
            'name' => 'Test Event',
            'category' => Event::CATEGORY_TAHUN_1,
            'gender' => Event::GENDER_MIXED,
            'type' => Event::TYPE_INDIVIDUAL,
            'max_participants' => 10,
            'is_active' => true,
            'order' => 1,
        ];

        return Event::create(array_merge($defaults, $attributes));
    }

    public function test_cikgu_can_only_see_eligible_students_from_own_house(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);
        $studentMerah = $this->createStudent($school, $houseMerah, ['name' => 'Student Merah']);
        $this->createStudent($school, $houseBiru, ['name' => 'Student Biru']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguMerah)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Events/Participants/Index')
            ->has('eligibleStudents', 1)
            ->where('eligibleStudents.0.name', $studentMerah->name)
        );
    }

    public function test_cikgu_without_house_cannot_see_eligible_students(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $cikguTanpaRumah = $this->createCikgu($school, null);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguTanpaRumah)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertRedirect(route('cikgu.dashboard'));
        $response->assertSessionHas('error');
    }

    public function test_eligible_students_filter_by_event_category(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $eligible = $this->createStudent($school, $house, ['name' => 'Student Tahun 1', 'year' => 1]);
        $this->createStudent($school, $house, ['name' => 'Student Tahun 5', 'year' => 5]);
        $event = $this->createEvent($school, ['category' => Event::CATEGORY_TAHUN_1]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('eligibleStudents', 1)
            ->where('eligibleStudents.0.name', $eligible->name)
        );
    }

    public function test_eligible_students_filter_by_gender(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $male = $this->createStudent($school, $house, ['name' => 'Student Male', 'gender' => 'L']);
        $this->createStudent($school, $house, ['name' => 'Student Female', 'gender' => 'P']);
        $event = $this->createEvent($school, [
            'category' => Event::CATEGORY_TAHUN_1,
            'gender' => Event::GENDER_MALE,
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('eligibleStudents', 1)
            ->where('eligibleStudents.0.name', $male->name)
        );
    }

    public function test_registered_students_not_shown_in_eligible_list(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $student = $this->createStudent($school, $house, ['name' => 'Registered Student']);
        $event = $this->createEvent($school);

        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $student->id,
            'house_id' => $house->id,
            'status' => 'registered',
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('eligibleStudents', fn ($students) => collect($students)->where('name', $student->name)->isEmpty())
        );
    }

    public function test_students_without_house_not_shown_in_eligible_list(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $this->createStudent($school, null, ['name' => 'No House Student']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('eligibleStudents', fn ($students) => collect($students)->where('name', 'No House Student')->isEmpty())
        );
    }

    public function test_cikgu_can_register_student_from_own_house(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $student = $this->createStudent($school, $house, ['name' => 'Registerable Student']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student->id,
            'house_id' => $house->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_from_other_house(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);
        $studentBiru = $this->createStudent($school, $houseBiru, ['name' => 'Student Biru']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentBiru->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('registration_errors');
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_without_house(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $studentNoHouse = $this->createStudent($school, null, ['name' => 'No House Student']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentNoHouse->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('registration_errors');
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentNoHouse->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_from_different_school(): void
    {
        $school1 = $this->createSchool();
        $school2 = $this->createSchool();
        $this->createMeet($school1);
        $house1 = House::factory()->create(['sekolah_id' => $school1->id]);
        $house2 = House::factory()->create(['sekolah_id' => $school2->id]);
        $cikgu = $this->createCikgu($school1, $house1);
        $studentOtherSchool = $this->createStudent($school2, $house2, ['name' => 'Other School Student']);
        $event = $this->createEvent($school1);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentOtherSchool->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('registration_errors');
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentOtherSchool->id,
        ]);
    }

    public function test_max_participants_per_house_limit_respected(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $event = $this->createEvent($school, ['max_participants' => 1]);
        $student1 = $this->createStudent($school, $house, ['name' => 'Student 1']);
        $student2 = $this->createStudent($school, $house, ['name' => 'Student 2']);
        $student3 = $this->createStudent($school, $house, ['name' => 'Student 3']);
        $student4 = $this->createStudent($school, $house, ['name' => 'Student 4']);
        $student5 = $this->createStudent($school, $house, ['name' => 'Student 5']);

        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $student1->id,
            'house_id' => $house->id,
            'status' => 'registered',
        ]);
        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $student2->id,
            'house_id' => $house->id,
            'status' => 'registered',
        ]);
        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $student3->id,
            'house_id' => $house->id,
            'status' => 'registered',
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$student4->id, $student5->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('registration_errors');
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student4->id,
        ]);
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student5->id,
        ]);
    }

    public function test_cikgu_without_house_cannot_register_anyone(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikguTanpaRumah = $this->createCikgu($school, null);
        $student = $this->createStudent($school, $house, ['name' => 'Any Student']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguTanpaRumah)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.dashboard'));
        $response->assertSessionHas('error');
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student->id,
        ]);
    }

    public function test_ineligible_student_cannot_be_registered(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $studentTahunLima = $this->createStudent($school, $house, ['name' => 'Student Tahun 5', 'year' => 5]);
        $event = $this->createEvent($school, ['category' => Event::CATEGORY_TAHUN_1]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentTahunLima->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('registration_errors');
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentTahunLima->id,
        ]);
    }

    public function test_manipulated_request_with_wrong_student_id_still_rejected(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);
        $studentBiru = $this->createStudent($school, $houseBiru, ['name' => 'Student Biru']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentBiru->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_can_see_own_house_participants_only(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);
        $event = $this->createEvent($school);
        $studentMerah = $this->createStudent($school, $houseMerah, ['name' => 'Participant Merah']);
        $studentBiru = $this->createStudent($school, $houseBiru, ['name' => 'Participant Biru']);

        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $studentMerah->id,
            'house_id' => $houseMerah->id,
            'status' => 'registered',
        ]);
        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
            'house_id' => $houseBiru->id,
            'status' => 'registered',
        ]);

        $response = $this->actingAs($cikguMerah)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('participants', 1)
            ->where('participants.0.student.name', $studentMerah->name)
        );
    }

    public function test_cikgu_can_bulk_register_multiple_students_from_own_house(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);
        $student1 = $this->createStudent($school, $house, ['name' => 'Student One']);
        $student2 = $this->createStudent($school, $house, ['name' => 'Student Two']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$student1->id, $student2->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student1->id,
        ]);
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student2->id,
        ]);
    }

    public function test_cikgu_cannot_bulk_register_mixed_house_students(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);
        $studentMerah = $this->createStudent($school, $houseMerah, ['name' => 'Student Merah']);
        $studentBiru = $this->createStudent($school, $houseBiru, ['name' => 'Student Biru']);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', $event->id), [
                'student_ids' => [$studentMerah->id, $studentBiru->id],
            ]);

        $response->assertRedirect(route('cikgu.events.participants.index', $event->id));
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentMerah->id,
        ]);
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_can_see_eligible_list_with_correct_house_info(): void
    {
        $school = $this->createSchool();
        $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah', 'color' => '#FF0000']);
        $cikgu = $this->createCikgu($school, $houseMerah);
        $event = $this->createEvent($school);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', $event->id));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Events/Participants/Index')
            ->where('myHouse.id', $houseMerah->id)
            ->where('myHouse.name', 'Merah')
        );
    }
}
