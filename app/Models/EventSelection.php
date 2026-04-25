<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventSelection extends Model
{
    protected $fillable = [
        'sekolah_id',
        'event_category_id',
        'template_name',
        'type',
        'is_relay',
        'has_qualifying_round',
        'has_multiple_attempts',
        'attempts_count',
        'max_participants',
        'status',
        'created_by',
        'configured_by',
    ];

    protected $casts = [
        'is_relay' => 'boolean',
        'has_qualifying_round' => 'boolean',
        'has_multiple_attempts' => 'boolean',
        'attempts_count' => 'integer',
        'max_participants' => 'integer',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIGURED = 'configured';
    const STATUS_CANCELLED = 'cancelled';

    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    public function eventCategory(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function configuredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'configured_by');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'event_selection_id');
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isConfigured(): bool
    {
        return $this->status === self::STATUS_CONFIGURED;
    }
}
