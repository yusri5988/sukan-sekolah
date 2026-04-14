<?php

namespace Tests\Feature;

use App\Models\House;
use App\Models\Sekolah;
use App\Models\User;
use App\Services\TeacherAssignmentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use InvalidArgumentException;
use Tests\TestCase;

class TeacherAssignmentServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_teachers_of_a_school_with_their_house()
    {
        $school = Sekolah::factory()->create();
        $otherSchool = Sekolah::factory()->create();

        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $house->id,
        ]);
        User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $otherSchool->id,
        ]);

        $service = new TeacherAssignmentService;
        $result = $service->getTeachersWithHouse($school);

        $this->assertCount(1, $result);
        $this->assertTrue($result->first()->isCikgu());
        $this->assertEquals($house->id, $result->first()->house->id);
    }

    public function test_assign_teacher_to_house_successfully()
    {
        $school = Sekolah::factory()->create();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => null,
        ]);

        $service = new TeacherAssignmentService;
        $service->assign($teacher, $house);

        $this->assertEquals($house->id, $teacher->fresh()->house_id);
    }

    public function test_cannot_assign_non_teacher()
    {
        $this->expectException(InvalidArgumentException::class);
        $school = Sekolah::factory()->create();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $admin = User::factory()->create([
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $school->id,
        ]);

        $service = new TeacherAssignmentService;
        $service->assign($admin, $house);
    }

    public function test_cannot_assign_teacher_to_house_of_another_school()
    {
        $this->expectException(InvalidArgumentException::class);
        $schoolA = Sekolah::factory()->create();
        $schoolB = Sekolah::factory()->create();

        $houseB = House::factory()->create(['sekolah_id' => $schoolB->id]);
        $teacherA = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $schoolA->id,
        ]);

        $service = new TeacherAssignmentService;
        $service->assign($teacherA, $houseB);
    }

    public function test_unassign_teacher_clears_house_id()
    {
        $school = Sekolah::factory()->create();
        $house = House::factory()->create(['sekolah_id' => $school->id]);
        $teacher = User::factory()->create([
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $school->id,
            'house_id' => $house->id,
        ]);

        $service = new TeacherAssignmentService;
        $service->unassign($teacher);

        $this->assertNull($teacher->fresh()->house_id);
    }
}
