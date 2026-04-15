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
        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('event_category_id')->after('meet_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_template_id')->after('event_category_id')->nullable()->constrained()->cascadeOnDelete();
            $table->boolean('has_qualifying_round')->after('type')->default(false);
            $table->boolean('has_multiple_attempts')->after('has_qualifying_round')->default(false);
            $table->integer('attempts_count')->after('has_multiple_attempts')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['event_category_id']);
            $table->dropForeign(['event_template_id']);
            $table->dropColumn(['event_category_id', 'event_template_id', 'has_qualifying_round', 'has_multiple_attempts', 'attempts_count']);
        });
    }
};
