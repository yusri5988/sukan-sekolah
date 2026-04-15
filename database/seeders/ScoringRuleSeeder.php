<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\ScoringRule;
use Illuminate\Database\Seeder;

class ScoringRuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $track = EventCategory::where('code', 'track')->first();
        $field = EventCategory::where('code', 'field')->first();
        $funGames = EventCategory::where('code', 'fun_games')->first();

        $scoringRules = [
            [
                'event_category_id' => $track->id,
                'position' => 1,
                'points' => 9,
                'description' => 'Tempat pertama - 9 mata',
            ],
            [
                'event_category_id' => $track->id,
                'position' => 2,
                'points' => 6,
                'description' => 'Tempat kedua - 6 mata',
            ],
            [
                'event_category_id' => $track->id,
                'position' => 3,
                'points' => 4,
                'description' => 'Tempat ketiga - 4 mata',
            ],
            [
                'event_category_id' => $track->id,
                'position' => 4,
                'points' => 3,
                'description' => 'Tempat keempat - 3 mata',
            ],
            [
                'event_category_id' => $track->id,
                'position' => 5,
                'points' => 2,
                'description' => 'Tempat kelima - 2 mata',
            ],
            [
                'event_category_id' => $track->id,
                'position' => 6,
                'points' => 1,
                'description' => 'Tempat keenam - 1 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 1,
                'points' => 9,
                'description' => 'Tempat pertama - 9 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 2,
                'points' => 6,
                'description' => 'Tempat kedua - 6 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 3,
                'points' => 4,
                'description' => 'Tempat ketiga - 4 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 4,
                'points' => 3,
                'description' => 'Tempat keempat - 3 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 5,
                'points' => 2,
                'description' => 'Tempat kelima - 2 mata',
            ],
            [
                'event_category_id' => $field->id,
                'position' => 6,
                'points' => 1,
                'description' => 'Tempat keenam - 1 mata',
            ],
            [
                'event_category_id' => $funGames->id,
                'position' => 1,
                'points' => 5,
                'description' => 'Tempat pertama - 5 mata',
            ],
            [
                'event_category_id' => $funGames->id,
                'position' => 2,
                'points' => 3,
                'description' => 'Tempat kedua - 3 mata',
            ],
            [
                'event_category_id' => $funGames->id,
                'position' => 3,
                'points' => 2,
                'description' => 'Tempat ketiga - 2 mata',
            ],
            [
                'event_category_id' => $funGames->id,
                'position' => 4,
                'points' => 1,
                'description' => 'Tempat keempat - 1 mata',
            ],
        ];

        foreach ($scoringRules as $rule) {
            ScoringRule::create($rule);
        }
    }
}
