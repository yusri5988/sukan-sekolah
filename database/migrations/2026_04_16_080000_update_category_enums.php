<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            return;
        }

        DB::statement("ALTER TABLE events MODIFY COLUMN category ENUM('7-9', '10-12', '13-15', '16+', 'tahun_1', 'tahun_2', 'tahun_3', 'tahun_4', 'tahun_5', 'tahun_6', 'all') NOT NULL");
        DB::statement("ALTER TABLE event_templates MODIFY COLUMN category ENUM('7-9', '10-12', '13-15', '16+', 'tahun_1', 'tahun_2', 'tahun_3', 'tahun_4', 'tahun_5', 'tahun_6', 'all') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            return;
        }

        DB::statement("ALTER TABLE events MODIFY COLUMN category ENUM('7-9', '10-12', '13-15', '16+', 'all') NOT NULL");
        DB::statement("ALTER TABLE event_templates MODIFY COLUMN category ENUM('7-9', '10-12', '13-15', '16+', 'all') NOT NULL");
    }
};
