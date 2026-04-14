<?php

namespace App\Models;

use Database\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    /** @use HasFactory<StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'sekolah_id',
        'house_id',
        'name',
        'ic_number',
        'class',
        'year',
        'gender',
        'date_of_birth',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /**
     * Get the sekolah that owns the student
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get the house that the student belongs to
     */
    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }

    /**
     * Calculate age from date of birth
     */
    public function getAgeAttribute(): int
    {
        return $this->date_of_birth->age;
    }

    /**
     * Get age category based on age
     */
    public function getAgeCategoryAttribute(): string
    {
        $age = $this->age;

        if ($age >= 7 && $age <= 9) {
            return '7-9';
        } elseif ($age >= 10 && $age <= 12) {
            return '10-12';
        } elseif ($age >= 13 && $age <= 15) {
            return '13-15';
        } else {
            return '16+';
        }
    }
}
