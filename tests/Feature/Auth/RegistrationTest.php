<?php

namespace Tests\Feature\Auth;

use App\Models\SchoolReference;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $reference = SchoolReference::create([
            'negeri' => 'TERENGGANU',
            'nama' => 'SEKOLAH UJIAN',
            'slug' => 'terengganu-sekolah-ujian',
            'is_used' => false,
        ]);

        $response = $this->post('/register', [
            'nama' => 'Admin Ujian',
            'telefon' => '0123456789',
            'school_reference_id' => $reference->id,
        ]);

        $response->assertRedirect(route('register', absolute: false));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('sekolahs', [
            'school_reference_id' => $reference->id,
            'telefon' => '60123456789',
        ]);
        $this->assertDatabaseHas('users', [
            'name' => 'Admin Ujian',
            'role' => User::ROLE_ADMIN_SEKOLAH,
        ]);
        $this->assertTrue(Sekolah::query()->where('school_reference_id', $reference->id)->exists());
        $this->assertDatabaseHas('school_references', [
            'id' => $reference->id,
            'is_used' => true,
        ]);
    }
}
