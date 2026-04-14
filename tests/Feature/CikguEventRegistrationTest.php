<?php

namespace Tests\Feature;

use App\Models\Event;
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
            'ic_number' => '1234567890'.rand(1000, 9999),
            'class' => '1A',
            'year' => 1,
            'gender' => 'male',
            'date_of_birth' => '2015-01-01',
        ];

        return Student::create(array_merge($defaults, $attributes));
    }

    protected function createEvent(Sekolah $school, Meet $meet, array $attributes = []): Event
    {
        $defaults = [
            'sekolah_id' => $school->id,
            'meet_id' => $meet->id,
            'name' => 'Test Event',
            'category' => Event::CATEGORY_7_9,
            'gender' => Event::GENDER_MIXED,
            'type' => Event::TYPE_INDIVIDUAL,
            'max_participants' => 10,
            'is_active' => true,
            'order' => 1,
        ];

        return Event::create(array_merge($defaults, $attributes));
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

    // ============ TEST: getEligibleStudents ============

    public function test_cikgu_can_only_see_eligible_students_from_own_house()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);

        $cikguMerah = $this->createCikgu($school, $houseMerah);

        // Pelajar dari rumah Merah (layak)
        $studentMerah = $this->createStudent($school, $houseMerah, [
            'name' => 'Student Merah',
            'date_of_birth' => now()->subYears(8), // 8 tahun
        ]);

        // Pelajar dari rumah Biru (tidak layak untuk cikgu Merah)
        $studentBiru = $this->createStudent($school, $houseBiru, [
            'name' => 'Student Biru',
            'date_of_birth' => now()->subYears(8),
        ]);

        // Acara untuk umur 7-9
        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikguMerah)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        // Pelajar Merah mesti ada
        $response->assertSee('Student Merah', false);
        // Pelajar Biru mesti tiada
        $response->assertDontSee('Student Biru', false);
    }

    public function test_cikgu_without_house_cannot_see_eligible_students()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $cikguTanpaRumah = $this->createCikgu($school, null);
        $house = House::factory()->create(['sekolah_id' => $school->id]);

        $event = $this->createEvent($school, $meet);

        $response = $this->actingAs($cikguTanpaRumah)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertRedirect(route('cikgu.dashboard'));
        $response->assertSessionHas('error');
    }

    public function test_eligible_students_filter_by_age_category()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        // Pelajar umur 8 tahun (layak untuk 7-9)
        $student8yo = $this->createStudent($school, $house, [
            'name' => 'Student 8yo',
            'date_of_birth' => now()->subYears(8),
        ]);

        // Pelajar umur 12 tahun (tidak layak untuk 7-9)
        $student12yo = $this->createStudent($school, $house, [
            'name' => 'Student 12yo',
            'date_of_birth' => now()->subYears(12),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        $response->assertSee('Student 8yo', false);
        $response->assertDontSee('Student 12yo', false);
    }

    public function test_eligible_students_filter_by_gender()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        // Pelajar lelaki
        $studentMale = $this->createStudent($school, $house, [
            'name' => 'Student Male',
            'gender' => 'male',
            'date_of_birth' => now()->subYears(8),
        ]);

        // Pelajar perempuan
        $studentFemale = $this->createStudent($school, $house, [
            'name' => 'Student Female',
            'gender' => 'female',
            'date_of_birth' => now()->subYears(8),
        ]);

        // Acara khusus lelaki
        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
            'gender' => Event::GENDER_MALE,
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        $response->assertSee('Student Male', false);
        $response->assertDontSee('Student Female', false);
    }

    public function test_registered_students_not_shown_in_eligible_list()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $student = $this->createStudent($school, $house, [
            'name' => 'Registered Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        // Daftarkan pelajar
        EventParticipant::create([
            'event_id' => $event->id,
            'student_id' => $student->id,
            'house_id' => $house->id,
            'status' => 'registered',
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        // Pelajar yang sudah didaftarkan tidak ada dalam senarai eligible
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Events/Participants/Index')
            ->where('eligibleStudents', fn ($students) => $students->where('name', 'Registered Student')->isEmpty())
        );
    }

    public function test_students_without_house_not_shown_in_eligible_list()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        // Pelajar tanpa rumah
        $studentNoHouse = $this->createStudent($school, null, [
            'name' => 'No House Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        $response->assertDontSee('No House Student', false);
    }

    // ============ TEST: bulkRegister ============

    public function test_cikgu_can_register_student_from_own_house()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $student = $this->createStudent($school, $house, [
            'name' => 'Registerable Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student->id,
            'house_id' => $house->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_from_other_house()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);

        $studentBiru = $this->createStudent($school, $houseBiru, [
            'name' => 'Student Biru',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$studentBiru->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('registration_errors');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_without_house()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $studentNoHouse = $this->createStudent($school, null, [
            'name' => 'No House Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$studentNoHouse->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('registration_errors');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentNoHouse->id,
        ]);
    }

    public function test_cikgu_cannot_register_student_from_different_school()
    {
        $school1 = $this->createSchool();
        $school2 = $this->createSchool();
        $meet = $this->createMeet($school1);
        $house1 = House::factory()->create(['sekolah_id' => $school1->id]);
        $house2 = House::factory()->create(['sekolah_id' => $school2->id]);
        $cikgu = $this->createCikgu($school1, $house1);

        $studentOtherSchool = $this->createStudent($school2, $house2, [
            'name' => 'Other School Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school1, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$studentOtherSchool->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('registration_errors');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentOtherSchool->id,
        ]);
    }

    public function test_max_participants_limit_respected()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        // Acara dengan max 2 peserta
        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
            'max_participants' => 2,
        ]);

        // Daftarkan 2 pelajar dahulu
        $student1 = $this->createStudent($school, $house, [
            'name' => 'Student 1',
            'date_of_birth' => now()->subYears(8),
        ]);
        $student2 = $this->createStudent($school, $house, [
            'name' => 'Student 2',
            'date_of_birth' => now()->subYears(8),
        ]);

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

        // Cuba daftarkan 1 lagi
        $student3 = $this->createStudent($school, $house, [
            'name' => 'Student 3',
            'date_of_birth' => now()->subYears(8),
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$student3->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('registration_errors');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student3->id,
        ]);
    }

    public function test_cikgu_without_house_cannot_register_anyone()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikguTanpaRumah = $this->createCikgu($school, null);

        $student = $this->createStudent($school, $house, [
            'name' => 'Any Student',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikguTanpaRumah)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$student->id],
            ]);

        $response->assertRedirect(route('cikgu.dashboard'));
        $response->assertSessionHas('error');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student->id,
        ]);
    }

    public function test_ineligible_student_cannot_be_registered()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        // Pelajar umur 12 (tidak layak untuk acara 7-9)
        $student12yo = $this->createStudent($school, $house, [
            'name' => 'Student 12yo',
            'date_of_birth' => now()->subYears(12),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$student12yo->id],
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('registration_errors');

        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $student12yo->id,
        ]);
    }

    public function test_manipulated_request_with_wrong_student_id_still_rejected()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);

        $studentMerah = $this->createStudent($school, $houseMerah, [
            'name' => 'Student Merah',
            'date_of_birth' => now()->subYears(8),
        ]);
        $studentBiru = $this->createStudent($school, $houseBiru, [
            'name' => 'Student Biru',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        // Cikgu Merah cuba daftar pelajar Biru (melalui manipulasi request)
        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$studentBiru->id], // ID pelajar Biru
            ]);

        $response->assertRedirect();
        // Pelajar Biru ditolak
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_can_see_own_house_participants_only()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $studentMerah = $this->createStudent($school, $houseMerah, [
            'name' => 'Participant Merah',
            'date_of_birth' => now()->subYears(8),
        ]);
        $studentBiru = $this->createStudent($school, $houseBiru, [
            'name' => 'Participant Biru',
            'date_of_birth' => now()->subYears(8),
        ]);

        // Daftarkan kedua-dua pelajar
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
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        // Cikgu Merah hanya nampak peserta Merah
        $response->assertSee('Participant Merah', false);
        $response->assertDontSee('Participant Biru', false);
    }

    public function test_cikgu_can_bulk_register_multiple_students_from_own_house()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $cikgu = $this->createCikgu($school, $house);

        $student1 = $this->createStudent($school, $house, [
            'name' => 'Student One',
            'date_of_birth' => now()->subYears(8),
        ]);
        $student2 = $this->createStudent($school, $house, [
            'name' => 'Student Two',
            'date_of_birth' => now()->subYears(9),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikgu)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$student1->id, $student2->id],
            ]);

        $response->assertRedirect();
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

    public function test_cikgu_cannot_bulk_register_mixed_house_students()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);
        $houseBiru = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Biru']);
        $cikguMerah = $this->createCikgu($school, $houseMerah);

        $studentMerah = $this->createStudent($school, $houseMerah, [
            'name' => 'Student Merah',
            'date_of_birth' => now()->subYears(8),
        ]);
        $studentBiru = $this->createStudent($school, $houseBiru, [
            'name' => 'Student Biru',
            'date_of_birth' => now()->subYears(8),
        ]);

        $event = $this->createEvent($school, $meet, [
            'category' => Event::CATEGORY_7_9,
        ]);

        $response = $this->actingAs($cikguMerah)
            ->post(route('cikgu.events.participants.store', [$meet->id, $event->id]), [
                'student_ids' => [$studentMerah->id, $studentBiru->id],
            ]);

        $response->assertRedirect();

        // Student Merah berjaya didaftarkan
        $this->assertDatabaseHas('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentMerah->id,
        ]);

        // Student Biru ditolak
        $this->assertDatabaseMissing('event_participants', [
            'event_id' => $event->id,
            'student_id' => $studentBiru->id,
        ]);
    }

    public function test_cikgu_can_see_eligible_list_with_correct_house_info()
    {
        $school = $this->createSchool();
        $meet = $this->createMeet($school);
        $houseMerah = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah', 'color' => '#FF0000']);
        $cikgu = $this->createCikgu($school, $houseMerah);

        $event = $this->createEvent($school, $meet);

        $response = $this->actingAs($cikgu)
            ->get(route('cikgu.events.participants.index', [$meet->id, $event->id]));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Cikgu/Events/Participants/Index')
            ->where('myHouse.id', $houseMerah->id)
            ->where('myHouse.name', 'Merah')
        );
    }
}
