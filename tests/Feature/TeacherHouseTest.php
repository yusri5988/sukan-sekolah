<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeacherHouseTest extends TestCase
{
    use RefreshDatabase;

    public function test_teacher_can_be_assigned_to_a_house_and_relation_works()
    {
        $house = House::factory()->create();

        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'house_id' => $house->id,
        ]);

        $this->assertTrue($teacher->isCikgu());
        $this->assertNotNull($teacher->house);
        $this->assertEquals($house->id, $teacher->house->id);
        $this->assertTrue($house->teachers->contains($teacher));
    }

    public function test_deleting_a_house_nulls_teacher_house_id()
    {
        $house = House::factory()->create();
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'house_id' => $house->id,
        ]);

        $house->delete();

        $teacher->refresh();
        $this->assertNull($teacher->house_id);
        $this->assertNull($teacher->house);
    }
}
