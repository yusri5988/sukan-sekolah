<?php

namespace App\DTOs;

use App\Models\Sekolah;
use App\Models\User;

readonly class CreateSekolahResultDTO
{
    public function __construct(
        public Sekolah $sekolah,
        public User $adminSekolah,
        public string $generatedPassword
    ) {}

    /**
     * Convert to array for response
     */
    public function toArray(): array
    {
        return [
            'sekolah' => [
                'id' => $this->sekolah->id,
                'nama' => $this->sekolah->nama,
                'negeri' => $this->sekolah->negeri,
                'kod_sekolah' => $this->sekolah->kod_sekolah,
                'alamat' => $this->sekolah->alamat,
                'telefon' => $this->sekolah->telefon,
                'email' => $this->sekolah->email,
                'created_at' => $this->sekolah->created_at,
            ],
            'admin_sekolah' => [
                'id' => $this->adminSekolah->id,
                'name' => $this->adminSekolah->name,
                'email' => $this->adminSekolah->email,
                'role' => $this->adminSekolah->role,
            ],
            'generated_password' => $this->generatedPassword,
        ];
    }
}
