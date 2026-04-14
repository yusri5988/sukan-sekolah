<?php

namespace App\Models;

use Database\Factories\MeetFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meet extends Model
{
    /** @use HasFactory<MeetFactory> */
    use HasFactory;

    protected $fillable = [
        'sekolah_id',
        'name',
        'date',
        'description',
        'status',
        'point_config',
        'is_public',
    ];

    protected $casts = [
        'date' => 'date',
        'point_config' => 'array',
        'is_public' => 'boolean',
    ];

    const STATUS_DRAFT = 'draft';

    const STATUS_ACTIVE = 'active';

    const STATUS_COMPLETED = 'completed';

    /**
     * Get the sekolah that owns the meet
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get all events for this meet
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class)->orderBy('order');
    }

    /**
     * Get active events
     */
    public function activeEvents(): HasMany
    {
        return $this->hasMany(Event::class)->where('is_active', true)->orderBy('order');
    }

    /**
     * Get points for a specific position
     */
    public function getPointsForPosition(int $position): int
    {
        $config = $this->point_config ?? ['1' => 5, '2' => 3, '3' => 1];

        return $config[(string) $position] ?? 0;
    }

    /**
     * Check if meet is active
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }
}
