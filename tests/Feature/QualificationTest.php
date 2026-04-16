<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\House;
use App\Models\Meet;
use App\Models\Result;
use App\Models\Sekolah;
use App\Models\User;
use App\Services\ResultService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QualificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_calculate_qualifiers_based_on_dynamic_settings()
    {
        $sekolah = Sekolah::factory()->create();
        $user = User::factory()->create(['role' => 'admin_sekolah', 'sekolah_id' => $sekolah->id]);
        $meet = Meet::create([
            'name' => 'Meet 1',
            'sekolah_id' => $sekolah->id,
            'date' => '2026-04-16',
            'status' => 'draft',
        ]);

        $category = EventCategory::create([
            'name' => 'Track',
            'code' => 'TRK',
            'sekolah_id' => $sekolah->id,
        ]);

        $house = House::create(['name' => 'Merah', 'sekolah_id' => $sekolah->id]);

        $event = Event::create([
            'name' => '100m',
            'sekolah_id' => $sekolah->id,
            'event_category_id' => $category->id,
            'category' => 'all',
            'gender' => 'male',
            'type' => 'individual',
            'settings' => [
                'lane_count' => 4,
                'qualifier_count' => 2,
                'max_participants_per_house' => 2,
            ],
        ]);

        Result::create(['event_id' => $event->id, 'time_record' => '12.0', 'house_id' => $house->id, 'position' => 3, 'points' => 0]);
        Result::create(['event_id' => $event->id, 'time_record' => '11.5', 'house_id' => $house->id, 'position' => 2, 'points' => 3]);
        Result::create(['event_id' => $event->id, 'time_record' => '13.0', 'house_id' => $house->id, 'position' => 4, 'points' => 0]);
        Result::create(['event_id' => $event->id, 'time_record' => '11.0', 'house_id' => $house->id, 'position' => 1, 'points' => 5]);

        $service = new ResultService;
        $qualifiers = $service->processQualification($event);

        $this->assertEquals(2, $qualifiers->count());
        $this->assertEquals('11.0', $qualifiers->first()->time_record);
        $this->assertEquals('11.5', $qualifiers->last()->time_record);
    }
}
