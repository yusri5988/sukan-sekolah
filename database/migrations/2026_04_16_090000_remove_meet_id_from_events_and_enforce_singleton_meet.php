<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('meets', function (Blueprint $table) {
            $table->unique('sekolah_id');
        });

        Schema::table('events', function (Blueprint $table) {
            if (Schema::hasColumn('events', 'meet_id')) {
                $table->dropForeign(['meet_id']);
                $table->dropColumn('meet_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            if (! Schema::hasColumn('events', 'meet_id')) {
                $table->foreignId('meet_id')->nullable()->after('sekolah_id')->constrained()->cascadeOnDelete();
            }
        });

        Schema::table('meets', function (Blueprint $table) {
            $table->dropUnique(['sekolah_id']);
        });
    }
};
