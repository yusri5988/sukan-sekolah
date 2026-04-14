<?php

namespace App\Models;

use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    protected $fillable = [
        'sekolah_id',
        'meet_id',
        'name',
        'category',
        'gender',
        'type',
        'max_participants',
        'scheduled_time',
        'scheduled_date',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'max_participants' => 'integer',
        'order' => 'integer',
    ];

    const CATEGORY_7_9 = '7-9';

    const CATEGORY_10_12 = '10-12';

    const CATEGORY_13_15 = '13-15';

    const CATEGORY_16_PLUS = '16+';

    const CATEGORY_ALL = 'all';

    const GENDER_MALE = 'male';

    const GENDER_FEMALE = 'female';

    const GENDER_MIXED = 'mixed';

    const TYPE_INDIVIDUAL = 'individual';

    const TYPE_RELAY = 'relay';

    /**
     * Get the sekolah that owns the event
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get the meet that owns the event
     */
    public function meet(): BelongsTo
    {
        return $this->belongsTo(Meet::class);
    }

    /**
     * Get all participants for this event
     * (Will be implemented in later phase)
     */
    public function participants(): HasMany
    {
        return $this->hasMany(EventParticipant::class);
    }

    /**
     * Get all results for this event
     * (Will be implemented in later phase)
     */
    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }

    /**
     * Check if event is relay
     */
    public function isRelay(): bool
    {
        return $this->type === self::TYPE_RELAY;
    }

    /**
     * Get category label
     */
    public function getCategoryLabelAttribute(): string
    {
        return match ($this->category) {
            self::CATEGORY_7_9 => '7-9 Tahun',
            self::CATEGORY_10_12 => '10-12 Tahun',
            self::CATEGORY_13_15 => '13-15 Tahun',
            self::CATEGORY_16_PLUS => '16+ Tahun',
            self::CATEGORY_ALL => 'Semua Umur',
            default => $this->category,
        };
    }

    /**
     * Get gender label
     */
    public function getGenderLabelAttribute(): string
    {
        return match ($this->gender) {
            self::GENDER_MALE => 'Lelaki',
            self::GENDER_FEMALE => 'Perempuan',
            self::GENDER_MIXED => 'Campuran',
            default => $this->gender,
        };
    }

    /**
     * Get type label
     */
    public function getTypeLabelAttribute(): string
    {
        return match ($this->type) {
            self::TYPE_INDIVIDUAL => 'Individu',
            self::TYPE_RELAY => 'Relay',
            default => $this->type,
        };
    }
}
