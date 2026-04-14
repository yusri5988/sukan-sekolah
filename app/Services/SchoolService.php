<?php

namespace App\Services;

use App\DTOs\CreateSekolahResultDTO;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SchoolService
{
    /**
     * Create a new sekolah and auto-generate admin sekolah account
     */
    public function createSekolah(array $data): CreateSekolahResultDTO
    {
        return DB::transaction(function () use ($data) {
            // Generate kod sekolah if not provided
            if (empty($data['kod_sekolah'])) {
                $data['kod_sekolah'] = $this->generateKodSekolah();
            }

            // Create sekolah
            $sekolah = Sekolah::create([
                'nama' => $data['nama'],
                'kod_sekolah' => $data['kod_sekolah'],
                'alamat' => $data['alamat'] ?? null,
                'telefon' => $data['telefon'] ?? null,
                'email' => $data['email'] ?? null,
                'admin_sekolah_id' => null, // Will be updated after creating admin
            ]);

            // Use fixed password for admin sekolah
            $generatedPassword = '123456';

            // Create admin sekolah user
            $adminSekolah = User::create([
                'name' => 'Admin '.$sekolah->nama,
                'email' => $this->generateAdminEmail($sekolah),
                'password' => Hash::make($generatedPassword),
                'role' => User::ROLE_ADMIN_SEKOLAH,
                'sekolah_id' => $sekolah->id,
            ]);

            // Update sekolah with admin_sekolah_id
            $sekolah->update(['admin_sekolah_id' => $adminSekolah->id]);

            return new CreateSekolahResultDTO(
                sekolah: $sekolah,
                adminSekolah: $adminSekolah,
                generatedPassword: $generatedPassword
            );
        });
    }

    /**
     * Generate unique kod sekolah
     */
    private function generateKodSekolah(): string
    {
        $prefix = 'SK';
        $date = now()->format('Ymd');
        $random = Str::upper(Str::random(4));

        return "{$prefix}-{$date}-{$random}";
    }

    /**
     * Generate admin email based on sekolah
     */
    private function generateAdminEmail(Sekolah $sekolah): string
    {
        $prefix = Str::slug($sekolah->nama, '');
        $random = Str::lower(Str::random(4));

        return "admin.{$prefix}.{$random}@sekolah.edu.my";
    }

    /**
     * Generate random password
     */
    private function generatePassword(): string
    {
        return Str::random(12);
    }
}
