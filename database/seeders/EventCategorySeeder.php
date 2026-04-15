<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Balapan',
                'code' => 'track',
                'description' => 'Acara balapan di trek (larim, lari berganti-ganti)',
                'color' => '#ef4444',
                'order' => 1,
            ],
            [
                'name' => 'Padang',
                'code' => 'field',
                'description' => 'Acara padang (lompat, lontar, lempar)',
                'color' => '#22c55e',
                'order' => 2,
            ],
            [
                'name' => 'Sukaneka',
                'code' => 'fun_games',
                'description' => 'Acara sukaneka dan permainan tradisional',
                'color' => '#f97316',
                'order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            EventCategory::create($category);
        }
    }
}
