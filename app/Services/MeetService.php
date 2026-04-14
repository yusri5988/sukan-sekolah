<?php

namespace App\Services;

use App\Models\Meet;
use App\Models\Sekolah;
use Illuminate\Support\Facades\DB;

class MeetService
{
    /**
     * Default point configuration
     */
    private const DEFAULT_POINT_CONFIG = [
        '1' => 5,
        '2' => 3,
        '3' => 1,
    ];

    /**
     * Create a new meet
     */
    public function createMeet(array $data, Sekolah $sekolah): Meet
    {
        return DB::transaction(function () use ($data, $sekolah) {
            return Meet::create([
                'sekolah_id' => $sekolah->id,
                'name' => $data['name'],
                'date' => $data['date'],
                'description' => $data['description'] ?? null,
                'status' => Meet::STATUS_DRAFT,
                'point_config' => $data['point_config'] ?? self::DEFAULT_POINT_CONFIG,
                'is_public' => $data['is_public'] ?? false,
            ]);
        });
    }

    /**
     * Update meet details
     */
    public function updateMeet(Meet $meet, array $data): Meet
    {
        $meet->update($data);

        return $meet->fresh();
    }

    /**
     * Activate a meet
     */
    public function activateMeet(Meet $meet): Meet
    {
        $meet->update(['status' => Meet::STATUS_ACTIVE]);

        return $meet->fresh();
    }

    /**
     * Complete a meet
     */
    public function completeMeet(Meet $meet): Meet
    {
        $meet->update(['status' => Meet::STATUS_COMPLETED]);

        return $meet->fresh();
    }

    /**
     * Toggle public visibility
     */
    public function togglePublic(Meet $meet): Meet
    {
        $meet->update(['is_public' => ! $meet->is_public]);

        return $meet->fresh();
    }

    /**
     * Delete a meet
     */
    public function deleteMeet(Meet $meet): bool
    {
        return $meet->delete();
    }

    /**
     * Get meets for a sekolah
     */
    public function getMeets(Sekolah $sekolah)
    {
        return $sekolah->meets()
            ->withCount('events')
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * Get active meet for a sekolah
     */
    public function getActiveMeet(Sekolah $sekolah): ?Meet
    {
        return $sekolah->meets()
            ->where('status', Meet::STATUS_ACTIVE)
            ->with('events')
            ->first();
    }
}
