<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PengurusAcaraAccessTest extends TestCase
{
    use RefreshDatabase;

    private function school(): Sekolah
    {
        return Sekolah::factory()->create();
    }

    private function eventManager(Sekolah $school): User
    {
        return User::factory()->create([
            'role' => User::ROLE_PENGURUS_ACARA,
            'sekolah_id' => $school->id,
        ]);
    }

    public function test_pengurus_acara_can_access_event_management_pages(): void
    {
        $school = $this->school();
        $school->meets()->create([
            'name' => 'Hari Sukan',
            'date' => '2026-04-16',
        ]);

        $category = EventCategory::create([
            'name' => 'Balapan',
            'code' => 'track',
            'order' => 1,
            'is_active' => true,
        ]);

        Event::create([
            'sekolah_id' => $school->id,
            'event_category_id' => $category->id,
            'name' => '100 Meter',
            'category' => Event::CATEGORY_TAHUN_1,
            'gender' => Event::GENDER_MALE,
            'type' => Event::TYPE_INDIVIDUAL,
            'is_active' => true,
            'order' => 1,
        ]);

        $manager = $this->eventManager($school);

        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.events.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Events/Index')
            ->has('events', 1)
        );
    }

    public function test_pengurus_acara_is_redirected_to_event_index_from_dashboard(): void
    {
        $school = $this->school();
        $school->meets()->create([
            'name' => 'Hari Sukan',
            'date' => '2026-04-16',
        ]);
        $manager = $this->eventManager($school);

        $response = $this->actingAs($manager)
            ->get(route('dashboard'));

        $response->assertRedirect(route('pengurus-acara.event-selections.index'));
    }

    public function test_pengurus_acara_cannot_access_non_event_admin_routes(): void
    {
        $school = $this->school();
        $manager = $this->eventManager($school);

        // Cannot access Houses
        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.houses.index'));
        $response->assertStatus(403);

        // Cannot access Students
        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.students.index'));
        $response->assertStatus(403);

        // Cannot access Scoring
        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.scoring.index'));
        $response->assertStatus(403);
    }

    public function test_pengurus_acara_cannot_access_participants_and_results(): void
    {
        $school = $this->school();
        $school->meets()->create([
            'name' => 'Hari Sukan',
            'date' => '2026-04-16',
        ]);
        $category = EventCategory::create([
            'name' => 'Balapan',
            'code' => 'track',
            'order' => 1,
            'is_active' => true,
        ]);
        $event = Event::create([
            'sekolah_id' => $school->id,
            'event_category_id' => $category->id,
            'name' => '100 Meter',
            'category' => Event::CATEGORY_TAHUN_1,
            'gender' => Event::GENDER_MALE,
            'type' => Event::TYPE_INDIVIDUAL,
            'is_active' => true,
            'order' => 1,
        ]);

        $manager = $this->eventManager($school);

        // Cannot access Participants
        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.events.participants.index', $event->id));
        $response->assertStatus(403);

        // Cannot access Results
        $response = $this->actingAs($manager)
            ->get(route('admin-sekolah.results.index', $event->id));
        $response->assertStatus(403);
    }
}
