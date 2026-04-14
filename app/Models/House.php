<?php

namespace App\Models;

use Database\Factories\HouseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends Model
{
    /** @use HasFactory<HouseFactory> */
    use HasFactory;

    protected $fillable = [
        'sekolah_id',
        'name',
        'color',
        'logo',
        'points',
    ];

    protected $casts = [
        'points' => 'integer',
    ];

    /**
     * Get the sekolah that owns the house
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get all students in this house
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    /**
     * Get all teachers (cikgu) assigned to this house
     */
    public function teachers(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get total number of students in this house
     */
    public function getStudentCountAttribute(): int
    {
        return $this->students()->count();
    }
}
