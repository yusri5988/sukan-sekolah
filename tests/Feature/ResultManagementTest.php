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
use App\Services\ResultService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResultManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->sekolah = Sekolah::factory()->create();
        $this->user = User::factory()->create([
            'sekolah_id' => $this->sekolah->id,
            'role' => 'admin_sekolah',
        ]);

        $this->meet = Meet::create([
            'sekolah_id' => $this->sekolah->id,
            'name' => 'Kejohanan Sukan 2026',
            'date' => '2026-04-15',
            'status' => 'active',
            'point_config' => ['1' => 10, '2' => 7, '3' => 5],
        ]);

        $this->category = EventCategory::create([
            'name' => 'Balapan',
            'code' => 'track',
            'order' => 1,
            'is_active' => true,
        ]);

        $this->event = Event::create([
            'sekolah_id' => $this->sekolah->id,
            'event_category_id' => $this->category->id,
            'name' => '100m Lelaki',
            'category' => Event::CATEGORY_TAHUN_5,
            'gender' => 'male',
            'type' => 'individual',
        ]);

        $this->house = House::factory()->create(['sekolah_id' => $this->sekolah->id, 'name' => 'Merah']);

        $this->student1 = Student::create([
            'sekolah_id' => $this->sekolah->id,
            'house_id' => $this->house->id,
            'name' => 'Pelajar A',
            'ic_number' => '123456789012',
            'class' => '5A',
            'year' => 5,
            'gender' => 'L',
        ]);

        $this->student2 = Student::create([
            'sekolah_id' => $this->sekolah->id,
            'house_id' => $this->house->id,
            'name' => 'Pelajar B',
            'ic_number' => '123456789013',
            'class' => '5B',
            'year' => 5,
            'gender' => 'L',
        ]);

        $this->participant1 = EventParticipant::create([
            'event_id' => $this->event->id,
            'student_id' => $this->student1->id,
            'house_id' => $this->house->id,
        ]);

        $this->participant2 = EventParticipant::create([
            'event_id' => $this->event->id,
            'student_id' => $this->student2->id,
            'house_id' => $this->house->id,
        ]);
    }

    public function test_can_save_multiple_results_for_same_house_with_different_participants()
    {
        $this->actingAs($this->user);

        $service = app(ResultService::class);

        // Save first result (Place 1)
        $service->saveResult($this->event, [
            'event_participant_id' => $this->participant1->id,
            'house_id' => $this->house->id,
            'position' => 1,
            'is_locked' => true,
        ]);

        // Save second result (Place 2) for SAME HOUSE
        $service->saveResult($this->event, [
            'event_participant_id' => $this->participant2->id,
            'house_id' => $this->house->id,
            'position' => 2,
            'is_locked' => true,
        ]);

        $this->assertDatabaseCount('results', 2);

        $this->house->refresh();
        // Points config: 1st=10, 2nd=7. Total should be 17.
        $this->assertEquals(17, $this->house->points);
    }

    public function test_saving_same_participant_overwrites_previous_result_for_that_participant()
    {
        $this->actingAs($this->user);

        $service = app(ResultService::class);

        // Save first result (Place 1)
        $service->saveResult($this->event, [
            'event_participant_id' => $this->participant1->id,
            'house_id' => $this->house->id,
            'position' => 1,
            'is_locked' => true,
        ]);

        // Update to Place 2 for SAME PARTICIPANT
        $service->saveResult($this->event, [
            'event_participant_id' => $this->participant1->id,
            'house_id' => $this->house->id,
            'position' => 2,
            'is_locked' => true,
        ]);

        $this->assertDatabaseCount('results', 1);

        $this->house->refresh();
        // Points config: 2nd=7. Total should be 7.
        $this->assertEquals(7, $this->house->points);
    }
}
