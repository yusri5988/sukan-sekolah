<?php

namespace Tests\Feature\AdminSekolah;

use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeacherManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->sekolah = Sekolah::create([
            'nama' => 'Test School',
            'kod_sekolah' => 'TS001',
        ]);

        $this->adminSekolah = User::create([
            'name' => 'Admin Sekolah',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_ADMIN_SEKOLAH,
            'sekolah_id' => $this->sekolah->id,
        ]);

        $this->sekolah->update(['admin_sekolah_id' => $this->adminSekolah->id]);
    }

    public function test_admin_sekolah_can_view_teachers_list()
    {
        $teacher = User::create([
            'name' => 'Teacher One',
            'email' => 'teacher1@test.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $this->sekolah->id,
        ]);

        $response = $this->actingAs($this->adminSekolah)
            ->get(route('admin-sekolah.teachers.index'));

        $response->assertStatus(200);
        $response->assertSee('Teacher One');
    }

    public function test_admin_sekolah_can_create_teacher()
    {
        $response = $this->actingAs($this->adminSekolah)
            ->withoutMiddleware()
            ->post(route('admin-sekolah.teachers.store'), [
                'name' => 'New Teacher',
                'email' => 'newteacher@test.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
            ]);

        $response->assertRedirect(route('admin-sekolah.teachers.index'));
        $this->assertDatabaseHas('users', [
            'name' => 'New Teacher',
            'email' => 'newteacher@test.com',
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $this->sekolah->id,
        ]);
    }

    public function test_admin_sekolah_can_delete_teacher()
    {
        $teacher = User::create([
            'name' => 'Teacher To Delete',
            'email' => 'delete@test.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $this->sekolah->id,
        ]);

        $response = $this->actingAs($this->adminSekolah)
            ->withoutMiddleware()
            ->delete(route('admin-sekolah.teachers.destroy', $teacher->id));

        $response->assertRedirect(route('admin-sekolah.teachers.index'));
        $this->assertDatabaseMissing('users', ['id' => $teacher->id]);
    }

    public function test_admin_sekolah_cannot_delete_teacher_from_another_school()
    {
        $otherSekolah = Sekolah::create([
            'nama' => 'Other School',
            'kod_sekolah' => 'OS001',
        ]);

        $otherTeacher = User::create([
            'name' => 'Other Teacher',
            'email' => 'other@test.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $otherSekolah->id,
        ]);

        $response = $this->actingAs($this->adminSekolah)
            ->withoutMiddleware()
            ->delete(route('admin-sekolah.teachers.destroy', $otherTeacher->id));

        // Ownership check in Service should prevent deletion
        $this->assertDatabaseHas('users', ['id' => $otherTeacher->id]);
    }

    public function test_teacher_cannot_access_teacher_management()
    {
        $teacher = User::create([
            'name' => 'Just a Teacher',
            'email' => 'just@test.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_CIKGU,
            'sekolah_id' => $this->sekolah->id,
        ]);

        // Don't disable middleware here so we can test it
        $response = $this->actingAs($teacher)
            ->get(route('admin-sekolah.teachers.index'));

        $response->assertStatus(403);
    }
}
