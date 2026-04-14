<?php

namespace Database\Factories;

use App\Models\Sekolah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sekolah>
 */
class SekolahFactory extends Factory
{
    protected $model = Sekolah::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->company(),
            'kod_sekolah' => strtoupper(fake()->bothify('??###')),
            'alamat' => fake()->address(),
            'telefon' => fake()->phoneNumber(),
            'email' => fake()->unique()->companyEmail(),
            // admin_sekolah_id can be null for tests; handled separately
        ];
    }
}
