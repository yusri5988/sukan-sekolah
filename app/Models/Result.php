<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    protected $fillable = [
        'event_id',
        'event_participant_id',
        'house_id',
        'position',
        'points',
        'time_record',
        'notes',
        'is_verified',
        'is_locked',
    ];

    protected $casts = [
        'position' => 'integer',
        'points' => 'integer',
        'is_verified' => 'boolean',
        'is_locked' => 'boolean',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(EventParticipant::class, 'event_participant_id');
    }

    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }
}
