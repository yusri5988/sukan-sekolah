<?php

namespace App\Models;

use Database\Factories\SekolahFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        return $this->hasMany(User::class)->whereIn('role', User::teacherRoles());
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

    /**
     * Get all meets for this sekolah
     */
    public function meets(): HasMany
    {
        return $this->hasMany(Meet::class);
    }

    /**
     * Get singleton meet for this sekolah
     */
    public function meet(): HasOne
    {
        return $this->hasOne(Meet::class);
    }

    /**
     * Get all events for this sekolah
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    /**
     * Get all event selections for this sekolah
     */
    public function eventSelections(): HasMany
    {
        return $this->hasMany(EventSelection::class);
    }
}
