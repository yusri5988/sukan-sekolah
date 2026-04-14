<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SchoolReference extends Model
{
    use HasFactory;

    protected $fillable = [
        'negeri',
        'nama',
        'slug',
        'is_used',
        'used_at',
    ];

    protected function casts(): array
    {
        return [
            'is_used' => 'boolean',
            'used_at' => 'datetime',
        ];
    }

    public function sekolah(): HasOne
    {
        return $this->hasOne(Sekolah::class);
    }
}
