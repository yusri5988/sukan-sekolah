<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\EventTemplate;
use Illuminate\Database\Seeder;

class EventTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $track = EventCategory::where('code', 'track')->first();
        $field = EventCategory::where('code', 'field')->first();
        $funGames = EventCategory::where('code', 'fun_games')->first();

        $primaryYears = ['tahun_1', 'tahun_2', 'tahun_3', 'tahun_4', 'tahun_5', 'tahun_6'];
        $genders = ['male', 'female'];
        $order = 1;

        // 1. Balapan Templates (Track Events)
        $trackEvents = [
            ['name' => '50m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => ['tahun_1', 'tahun_2']],
            ['name' => '60m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => ['tahun_1', 'tahun_2', 'tahun_3']],
            ['name' => '80m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => ['tahun_1', 'tahun_2', 'tahun_3']],
            ['name' => '100m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => $primaryYears],
            ['name' => '200m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => $primaryYears],
            ['name' => '400m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => ['tahun_4', 'tahun_5', 'tahun_6']],
            ['name' => '800m', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => false, 'categories' => ['tahun_4', 'tahun_5', 'tahun_6']],
            ['name' => '80m Lari Berpagar', 'type' => 'individual', 'is_relay' => false, 'has_qualifying' => true, 'categories' => ['tahun_4', 'tahun_5', 'tahun_6']],
            ['name' => '4x100m', 'type' => 'relay', 'is_relay' => true, 'has_qualifying' => true, 'max' => 4, 'categories' => $primaryYears],
            ['name' => '4x200m', 'type' => 'relay', 'is_relay' => true, 'has_qualifying' => true, 'max' => 4, 'categories' => ['tahun_4', 'tahun_5', 'tahun_6']],
        ];

        foreach ($trackEvents as $event) {
            foreach ($event['categories'] as $year) {
                foreach ($genders as $gender) {
                    EventTemplate::updateOrCreate([
                        'event_category_id' => $track->id,
                        'name' => $event['name'],
                        'type' => $event['type'],
                        'gender' => $gender,
                        'category' => $year,
                        'is_relay' => $event['is_relay'],
                    ], [
                        'max_participants' => $event['max'] ?? 1,
                        'has_qualifying_round' => $event['has_qualifying'],
                        'has_multiple_attempts' => false,
                        'attempts_count' => 1,
                        'order' => $order++,
                        'is_active' => true,
                    ]);
                }
            }
        }

        // 2. Padang Templates (Field Events)
        $fieldEvents = [
            ['name' => 'Lontar Peluru', 'attempts' => 3],
            ['name' => 'Lompat Jauh', 'attempts' => 3],
            ['name' => 'Lompat Tinggi', 'attempts' => 3],
        ];

        foreach ($fieldEvents as $event) {
            foreach ($primaryYears as $year) {
                foreach ($genders as $gender) {
                    EventTemplate::updateOrCreate([
                        'event_category_id' => $field->id,
                        'name' => $event['name'],
                        'type' => 'individual',
                        'gender' => $gender,
                        'category' => $year,
                        'is_relay' => false,
                    ], [
                        'max_participants' => 1,
                        'has_qualifying_round' => false,
                        'has_multiple_attempts' => true,
                        'attempts_count' => $event['attempts'],
                        'order' => $order++,
                        'is_active' => true,
                    ]);
                }
            }
        }

        // 3. Sukaneka (Fun Games)
        $funGamesList = [
            ['name' => 'Tarik Tali', 'type' => 'relay', 'gender' => 'mixed', 'category' => 'all', 'max' => 8],
            ['name' => 'Lari Berkayu', 'type' => 'individual', 'gender' => 'male', 'category' => 'all'],
            ['name' => 'Lari Berkayu', 'type' => 'individual', 'gender' => 'female', 'category' => 'all'],
        ];

        foreach ($funGamesList as $event) {
            EventTemplate::updateOrCreate([
                'event_category_id' => $funGames->id,
                'name' => $event['name'],
                'type' => $event['type'],
                'gender' => $event['gender'],
                'category' => $event['category'],
                'is_relay' => ($event['type'] === 'relay'),
            ], [
                'max_participants' => $event['max'] ?? 1,
                'has_qualifying_round' => false,
                'has_multiple_attempts' => false,
                'attempts_count' => 1,
                'order' => $order++,
                'is_active' => true,
            ]);
        }
    }
}
