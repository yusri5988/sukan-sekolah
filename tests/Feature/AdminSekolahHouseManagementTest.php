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

    public function test_admin_can_auto_assign_students_evenly_across_houses(): void
    {
        $school = Sekolah::factory()->create();
        $admin = $this->admin($school);
        $houses = House::factory()->count(3)->create(['sekolah_id' => $school->id]);

        $students = collect();
        foreach (range(1, 5) as $index) {
            $students->push($this->student($school));
        }

        $response = $this->actingAs($admin)
            ->post(route('admin-sekolah.houses.auto-assign'));

        $response->assertRedirect(route('admin-sekolah.houses.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseCount('students', 5);
        $this->assertTrue(Student::where('sekolah_id', $school->id)->whereNull('house_id')->doesntExist());

        $counts = $houses->mapWithKeys(fn (House $house) => [$house->id => Student::where('house_id', $house->id)->count()]);

        $this->assertSame([1, 2, 2], $counts->values()->sort()->values()->all());
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
