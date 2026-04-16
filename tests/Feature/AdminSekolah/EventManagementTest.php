<?php

namespace Tests\Feature\AdminSekolah;

use App\Models\Event;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(); // Seed the database
    }

    public function test_admin_sekolah_can_see_grouped_events_index(): void
    {
        $sekolah = Sekolah::factory()->create();
        $sekolah->meets()->create(['name' => 'Hari Sukan', 'date' => '2026-04-16']);
        $admin = User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $sekolah->id,
        ]);

        // Create multiple events with the same name but different categories
        Event::create(['sekolah_id' => $sekolah->id, 'event_category_id' => 1, 'name' => '100 Meter', 'category' => '7-9', 'gender' => 'male', 'type' => 'individual', 'is_active' => true]);
        Event::create(['sekolah_id' => $sekolah->id, 'event_category_id' => 1, 'name' => '100 Meter', 'category' => '7-9', 'gender' => 'female', 'type' => 'individual', 'is_active' => true]);
        Event::create(['sekolah_id' => $sekolah->id, 'event_category_id' => 1, 'name' => 'Lompat Jauh', 'category' => '10-12', 'gender' => 'male', 'type' => 'individual', 'is_active' => true]);

        $response = $this->actingAs($admin)->get(route('admin-sekolah.events.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Events/Index')
            ->has('events', 2) // Should be grouped into 2 parent events
        );
    }
}
