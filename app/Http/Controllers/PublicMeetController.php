<?php

namespace App\Http\Controllers;

use App\Models\Meet;
use App\Models\Sekolah;
use App\Services\ResultService;
use Inertia\Inertia;

class PublicMeetController extends Controller
{
    public function __construct(
        private ResultService $resultService
    ) {}

    /**
     * Public meet dashboard
     */
    public function show(Sekolah $sekolah)
    {
        $meet = $sekolah->meet;

        if (! $meet) {
            abort(404);
        }

        $this->authorizePublicAccess($meet);

        $meet->load(['events' => function ($query) {
            $query->where('is_active', true)->orderBy('order');
        }]);

        $eventsWithResults = $meet->events->map(function ($event) {
            return [
                'id' => $event->id,
                'name' => $event->name,
                'category' => $event->category,
                'gender' => $event->gender,
                'type' => $event->type,
                'scheduled_time' => $event->scheduled_time,
                'scheduled_date' => $event->scheduled_date,
                'is_active' => $event->is_active,
                'results' => $event->results()->with('house')->orderBy('position')->get(),
                'participants_count' => $event->participants()->count(),
            ];
        });

        return Inertia::render('Public/Meet', [
            'meet' => [
                'id' => $meet->id,
                'name' => $meet->name,
                'date' => $meet->date,
                'description' => $meet->description,
                'status' => $meet->status,
                'is_public' => $meet->is_public,
                'sekolah_code' => $sekolah->kod_sekolah,
            ],
            'events' => $eventsWithResults,
            'ranking' => $this->resultService->getRanking($sekolah),
        ]);
    }

    /**
     * Public live ranking only
     */
    public function ranking(Sekolah $sekolah)
    {
        $meet = $sekolah->meet;

        if (! $meet) {
            abort(404);
        }

        $this->authorizePublicAccess($meet);

        return Inertia::render('Public/Ranking', [
            'meet' => [
                'id' => $meet->id,
                'name' => $meet->name,
                'date' => $meet->date,
                'sekolah_code' => $sekolah->kod_sekolah,
            ],
            'ranking' => $this->resultService->getRanking($sekolah),
        ]);
    }

    private function authorizePublicAccess(Meet $meet): void
    {
        if (! $meet->is_public && $meet->status !== 'active') {
            abort(404);
        }
    }
}
