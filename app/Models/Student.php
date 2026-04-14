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
}
