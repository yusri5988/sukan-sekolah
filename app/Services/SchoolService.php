<?php

namespace App\Services;

use App\DTOs\CreateSekolahResultDTO;
use App\Models\SchoolReference;
use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SchoolService
{
    /**
     * Create a new sekolah and auto-generate admin sekolah account
     */
    public function createSekolahFromReference(int $schoolReferenceId, string $nama, string $telefon): CreateSekolahResultDTO
    {
        return DB::transaction(function () use ($schoolReferenceId, $nama, $telefon) {
            $reference = SchoolReference::query()
                ->lockForUpdate()
                ->findOrFail($schoolReferenceId);

            if ($reference->is_used) {
                throw ValidationException::withMessages([
                    'school_reference_id' => 'Sekolah ini sudah didaftarkan dalam sistem.',
                ]);
            }

            $sekolah = Sekolah::create([
                'nama' => $reference->nama,
                'negeri' => $reference->negeri,
                'kod_sekolah' => $this->generateKodSekolah(),
                'alamat' => null,
                'telefon' => $telefon,
                'email' => null,
                'admin_sekolah_id' => null,
                'school_reference_id' => $reference->id,
            ]);

            $generatedPassword = '123456';

            $adminSekolah = User::create([
                'name' => $nama,
                'email' => $this->generateAdminEmail($sekolah),
                'password' => Hash::make($generatedPassword),
                'role' => User::ROLE_ADMIN_SEKOLAH,
                'sekolah_id' => $sekolah->id,
            ]);

            $sekolah->update(['admin_sekolah_id' => $adminSekolah->id]);

            $reference->update([
                'is_used' => true,
                'used_at' => now(),
            ]);

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
     * Generate sequential admin email for sekolah
     */
    private function generateAdminEmail(Sekolah $sekolah): string
    {
        $count = Sekolah::count() + 1;

        return sprintf('sk%04d@sekolah.com', $count);
    }
}
