<?php

namespace App\Models;

use Database\Factories\SekolahFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sekolah extends Model
{
    /** @use HasFactory<SekolahFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'negeri',
        'kod_sekolah',
        'alamat',
        'telefon',
        'email',
        'admin_sekolah_id',
        'school_reference_id',
    ];

    /**
     * Get the admin sekolah associated with this sekolah
     */
    public function adminSekolah(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_sekolah_id');
    }

    /**
     * Get the seeded school reference associated with this sekolah.
     */
    public function schoolReference(): BelongsTo
    {
        return $this->belongsTo(SchoolReference::class);
    }

    /**
     * Get all users (cikgu) associated with this sekolah
     */
    public function cikgus(): HasMany
    {
        return $this->hasMany(User::class)->where('role', User::ROLE_CIKGU);
    }

    /**
     * Get all houses for this sekolah
     */
    public function houses(): HasMany
    {
        return $this->hasMany(House::class);
    }

    /**
     * Get all students for this sekolah
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
