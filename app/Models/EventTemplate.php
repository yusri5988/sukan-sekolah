<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_category_id',
        'name',
        'type',
        'gender',
        'category',
        'max_participants',
        'has_qualifying_round',
        'has_multiple_attempts',
        'attempts_count',
        'is_relay',
        'order',
        'is_active',
    ];

    protected $casts = [
        'has_qualifying_round' => 'boolean',
        'has_multiple_attempts' => 'boolean',
        'attempts_count' => 'integer',
        'is_relay' => 'boolean',
        'order' => 'integer',
        'is_active' => 'boolean',
        'max_participants' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function isRelay(): bool
    {
        return $this->is_relay || $this->type === 'relay';
    }

    public function isIndividual(): bool
    {
        return ! $this->isRelay();
    }
}
