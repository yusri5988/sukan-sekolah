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
        'event_category_id',
        'event_template_id',
        'event_selection_id',
        'name',
        'category',
        'gender',
        'type',
        'max_participants',
        'has_qualifying_round',
        'has_multiple_attempts',
        'attempts_count',
        'scheduled_time',
        'scheduled_date',
        'order',
        'is_active',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'max_participants' => 'integer',
        'order' => 'integer',
        'has_qualifying_round' => 'boolean',
        'has_multiple_attempts' => 'boolean',
        'attempts_count' => 'integer',
        'settings' => 'array',
    ];

    const CATEGORY_7_9 = '7-9';

    const CATEGORY_10_12 = '10-12';

    const CATEGORY_13_15 = '13-15';

    const CATEGORY_16_PLUS = '16+';

    const CATEGORY_TAHUN_1 = 'tahun_1';

    const CATEGORY_TAHUN_2 = 'tahun_2';

    const CATEGORY_TAHUN_3 = 'tahun_3';

    const CATEGORY_TAHUN_4 = 'tahun_4';

    const CATEGORY_TAHUN_5 = 'tahun_5';

    const CATEGORY_TAHUN_6 = 'tahun_6';

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
     * Get the event category
     */
    public function eventCategory(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    /**
     * Get the event template
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(EventTemplate::class, 'event_template_id');
    }

    /**
     * Get the event selection that this event belongs to
     */
    public function eventSelection(): BelongsTo
    {
        return $this->belongsTo(EventSelection::class, 'event_selection_id');
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
            self::CATEGORY_TAHUN_1 => 'Tahun 1',
            self::CATEGORY_TAHUN_2 => 'Tahun 2',
            self::CATEGORY_TAHUN_3 => 'Tahun 3',
            self::CATEGORY_TAHUN_4 => 'Tahun 4',
            self::CATEGORY_TAHUN_5 => 'Tahun 5',
            self::CATEGORY_TAHUN_6 => 'Tahun 6',
            self::CATEGORY_ALL => 'Semua Umur',
            default => $this->category,
        };
    }

    /**
     * Get event category name
     */
    public function getEventCategoryNameAttribute(): ?string
    {
        if (! $this->event_category_id) {
            return match ($this->category) {
                self::CATEGORY_7_9 => '7-9 Tahun',
                self::CATEGORY_10_12 => '10-12 Tahun',
                self::CATEGORY_16_PLUS => '16+ Tahun',
                self::CATEGORY_TAHUN_1 => 'Tahun 1',
                self::CATEGORY_TAHUN_2 => 'Tahun 2',
                self::CATEGORY_TAHUN_3 => 'Tahun 3',
                self::CATEGORY_TAHUN_4 => 'Tahun 4',
                self::CATEGORY_TAHUN_5 => 'Tahun 5',
                self::CATEGORY_TAHUN_6 => 'Tahun 6',
                self::CATEGORY_ALL => 'Semua Umur',
                default => $this->category,
            };
        }

        return $this->eventCategory ? $this->eventCategory->name : null;
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

    /**
     * Get lane count from settings
     */
    public function getLaneCountAttribute(): int
    {
        return $this->settings['lane_count'] ?? 8;
    }

    /**
     * Check if event has heats
     */
    public function hasHeats(): bool
    {
        return $this->participants()->count() > $this->lane_count;
    }

    /**
     * Get heat count
     */
    public function getHeatCountAttribute(): int
    {
        if ($this->participants()->count() === 0) {
            return 0;
        }

        return (int) ceil($this->participants()->count() / $this->lane_count);
    }
}
