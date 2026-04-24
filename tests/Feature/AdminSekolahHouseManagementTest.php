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
}
