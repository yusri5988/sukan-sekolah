<?php

namespace Database\Factories;

use App\Models\House;
use App\Models\Sekolah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<House>
 */
class HouseFactory extends Factory
{
    protected $model = House::class;

    public function definition(): array
    {
        return [
            'sekolah_id' => Sekolah::factory(),
            'name' => fake()->word(),
            'color' => fake()->hexColor(),
            'logo' => null,
            'points' => 0,
        ];
    }
}
