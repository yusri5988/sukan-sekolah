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
        Schema::table('sekolahs', function (Blueprint $table) {
            $table->string('negeri')->nullable()->after('nama');
            $table->foreignId('school_reference_id')
                ->nullable()
                ->unique()
                ->after('admin_sekolah_id')
                ->constrained('school_references')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sekolahs', function (Blueprint $table) {
            $table->dropForeign(['school_reference_id']);
            $table->dropUnique(['school_reference_id']);
            $table->dropColumn(['negeri', 'school_reference_id']);
        });
    }
};
