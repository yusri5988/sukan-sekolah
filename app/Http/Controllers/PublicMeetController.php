<?php

namespace App\Http\Controllers;

use App\Models\Meet;
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
    public function show(Meet $meet)
    {
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
            ],
            'events' => $eventsWithResults,
            'ranking' => $this->resultService->getRanking($meet),
        ]);
    }

    /**
     * Public live ranking only
     */
    public function ranking(Meet $meet)
    {
        $this->authorizePublicAccess($meet);

        return Inertia::render('Public/Ranking', [
            'meet' => [
                'id' => $meet->id,
                'name' => $meet->name,
                'date' => $meet->date,
            ],
            'ranking' => $this->resultService->getRanking($meet),
        ]);
    }

    private function authorizePublicAccess(Meet $meet): void
    {
        if (! $meet->is_public && $meet->status !== Meet::STATUS_ACTIVE) {
            abort(404);
        }
    }
}
