<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'color',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    const TRACK = 'track';

    const FIELD = 'field';

    const FUN_GAMES = 'fun_games';

    public function templates(): HasMany
    {
        return $this->hasMany(EventTemplate::class);
    }

    public function formats(): HasMany
    {
        return $this->hasMany(EventFormat::class);
    }

    public function scoringRules(): HasMany
    {
        return $this->hasMany(ScoringRule::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function getActiveAttribute(): bool
    {
        return $this->is_active;
    }
}
