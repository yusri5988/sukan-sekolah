<?php

namespace App\Http\Controllers;

use App\Models\EventCategory;
use App\Models\ScoringRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ScoringController extends Controller
{
    /**
     * Display scoring configuration page
     */
    public function index()
    {
        $user = auth()->user();

        $categories = EventCategory::where('is_active', true)
            ->orderBy('order')
            ->with(['scoringRules' => function ($query) use ($user) {
                $query->where(function ($q) use ($user) {
                    $q->whereNull('sekolah_id')
                        ->orWhere('sekolah_id', $user->sekolah_id);
                })
                    ->orderBy('position');
            }])
            ->get();

        return Inertia::render('AdminSekolah/Scoring/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Update scoring rules for a category
     */
    public function update(Request $request, EventCategory $category)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'rules' => 'required|array',
            'rules.*.position' => 'required|integer|min:1',
            'rules.*.points' => 'required|integer|min:0',
            'rules.*.description' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($category, $validated, $user) {
            foreach ($validated['rules'] as $rule) {
                ScoringRule::updateOrCreate(
                    [
                        'event_category_id' => $category->id,
                        'sekolah_id' => $user->sekolah_id,
                        'position' => $rule['position'],
                    ],
                    [
                        'points' => $rule['points'],
                        'description' => $rule['description'] ?? null,
                    ]
                );
            }
        });

        return back()->with('success', 'Konfigurasi pemarkahan berjaya dikemaskini!');
    }
}
