<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\EventFormat;
use Illuminate\Database\Seeder;

class EventFormatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $track = EventCategory::where('code', 'track')->first();
        $field = EventCategory::where('code', 'field')->first();
        $funGames = EventCategory::where('code', 'fun_games')->first();

        $formats = [
            [
                'event_category_id' => $track->id,
                'config' => [
                    'has_lanes' => true,
                    'has_qualifying_round' => true,
                    'qualification_type' => 'time',
                    'final_round' => true,
                    'timing_method' => 'electronic',
                ],
                'description' => 'Format balapan: ada saringan, ikut masa untuk layakan ke final',
            ],
            [
                'event_category_id' => $field->id,
                'config' => [
                    'has_lanes' => false,
                    'has_qualifying_round' => false,
                    'attempts' => 3,
                    'best_attempt_counts' => true,
                    'measurement_unit' => 'meter',
                ],
                'description' => 'Format padang: 3 percubaan, ambil yang terbaik',
            ],
            [
                'event_category_id' => $funGames->id,
                'config' => [
                    'has_lanes' => false,
                    'has_qualifying_round' => false,
                    'scoring_type' => 'position',
                    'time_based' => false,
                ],
                'description' => 'Format sukaneka: ikut kedudukan sahaja',
            ],
        ];

        foreach ($formats as $format) {
            EventFormat::create($format);
        }
    }
}
