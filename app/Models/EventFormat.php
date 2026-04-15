<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventFormat extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_category_id',
        'config',
        'description',
    ];

    protected $casts = [
        'config' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }
}
