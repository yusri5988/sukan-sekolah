<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateAdminUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@g.com',
                'password' => Hash::make('123456'),
                'role' => 'super_admin',
                'sekolah_id' => null,
            ],
            // Admin Sekolah DAN Cikgu hanya dicipta melalui flow biasa
            // Admin Sekolah -> dicipta oleh Super Admin bila create sekolah
            // Cikgu -> boleh dicipta oleh Admin Sekolah kemudian
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
