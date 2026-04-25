<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminSekolahHouseManagementTest extends TestCase
{
    use RefreshDatabase;

    private function admin(Sekolah $school): User
    {
        return User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $school->id,
        ]);
    }

    private function student(Sekolah $school, ?House $house = null): Student
    {
        return Student::create([
            'sekolah_id' => $school->id,
            'house_id' => $house?->id,
            'name' => fake()->name(),
            'ic_number' => fake()->unique()->numerify('############'),
            'class' => '1A',
            'year' => 1,
            'gender' => 'L',
        ]);
    }

    public function test_admin_can_view_houses_index(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id, 'name' => 'Merah']);

        $response = $this->actingAs($admin)
            ->get(route('admin-sekolah.houses.index'));

        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Houses/Index')
            ->has('houses', 1)
            ->where('houses.0.name', 'Merah')
        );
    }

    public function test_admin_can_create_house(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);

        $response = $this->actingAs($admin)
            ->post(route('admin-sekolah.houses.store'), [
                'name' => 'Biru',
                'color' => '#3b82f6',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('houses', [
            'sekolah_id' => $school->id,
            'name' => 'Biru',
            'color' => '#3b82f6',
        ]);
    }

    public function test_admin_can_view_edit_form(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);

        $response = $this->actingAs($admin)
            ->get(route('admin-sekolah.houses.edit', $house->id));

        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Houses/Edit')
            ->where('house.id', $house->id)
        );
    }

    public function test_admin_can_update_house(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $house = House::factory()->create([
            'sekolah_id' => $school->id,
            'name' => 'Merah',
            'color' => '#ef4444',
        ]);

        $response = $this->actingAs($admin)
            ->patch(route('admin-sekolah.houses.update', $house->id), [
                'name' => 'Biru Baru',
                'color' => '#3b82f6',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('houses', [
            'id' => $house->id,
            'name' => 'Biru Baru',
            'color' => '#3b82f6',
        ]);
    }

    public function test_admin_can_delete_house_without_students(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);

        $response = $this->actingAs($admin)
            ->delete(route('admin-sekolah.houses.destroy', $house->id));

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('houses', ['id' => $house->id]);
    }

    public function test_admin_cannot_delete_house_with_students(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $this->student($school, $house);

        $response = $this->actingAs($admin)
            ->delete(route('admin-sekolah.houses.destroy', $house->id));

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('houses', ['id' => $house->id]);
    }

    public function test_admin_cannot_create_duplicate_house_name_in_same_school(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        House::factory()->create([
            'sekolah_id' => $school->id,
            'name' => 'Merah',
        ]);

        $response = $this->actingAs($admin)
            ->from(route('admin-sekolah.houses.create'))
            ->post(route('admin-sekolah.houses.store'), [
                'name' => 'Merah',
                'color' => '#ef4444',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.create'));
        $response->assertSessionHasErrors('name');
    }

    public function test_validation_requires_name(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);

        $response = $this->actingAs($admin)
            ->from(route('admin-sekolah.houses.create'))
            ->post(route('admin-sekolah.houses.store'), [
                'name' => '',
                'color' => '#ef4444',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.create'));
        $response->assertSessionHasErrors('name');
    }

    public function test_admin_can_create_house_with_new_colors(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);

        $response = $this->actingAs($admin)
            ->post(route('admin-sekolah.houses.store'), [
                'name' => 'Ungu',
                'color' => '#a855f7',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $this->assertDatabaseHas('houses', [
            'sekolah_id' => $school->id,
            'color' => '#a855f7',
        ]);
    }

    public function test_validation_rejects_invalid_color(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);

        $response = $this->actingAs($admin)
            ->from(route('admin-sekolah.houses.create'))
            ->post(route('admin-sekolah.houses.store'), [
                'name' => 'Test',
                'color' => '#123456',
            ]);

        $response->assertRedirect(route('admin-sekolah.houses.create'));
        $response->assertSessionHasErrors('color');
    }

    public function test_user_from_other_school_cannot_edit_house(): void
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminB = $this->admin($schoolB);
        $house = House::factory()->create(['sekolah_id' => $schoolA->id]);

        $response = $this->actingAs($adminB)
            ->get(route('admin-sekolah.houses.edit', $house->id));

        $response->assertForbidden();
    }

    public function test_user_from_other_school_cannot_update_house(): void
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminB = $this->admin($schoolB);
        $house = House::factory()->create(['sekolah_id' => $schoolA->id]);

        $response = $this->actingAs($adminB)
            ->patch(route('admin-sekolah.houses.update', $house->id), [
                'name' => 'Hacked',
                'color' => '#ef4444',
            ]);

        $response->assertForbidden();
    }

    public function test_user_from_other_school_cannot_delete_house(): void
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminB = $this->admin($schoolB);
        $house = House::factory()->create(['sekolah_id' => $schoolA->id]);

        $response = $this->actingAs($adminB)
            ->delete(route('admin-sekolah.houses.destroy', $house->id));

        $response->assertForbidden();
    }

    public function test_house_index_only_shows_own_school_houses(): void
    {
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();
        $adminA = $this->admin($schoolA);
        House::factory()->create(['sekolah_id' => $schoolA->id, 'name' => 'Merah']);
        House::factory()->create(['sekolah_id' => $schoolB->id, 'name' => 'Biru']);

        $response = $this->actingAs($adminA)
            ->get(route('admin-sekolah.houses.index'));

        $response->assertInertia(fn ($page) => $page
            ->component('AdminSekolah/Houses/Index')
            ->has('houses', 1)
            ->where('houses.0.name', 'Merah')
        );
    }
}
