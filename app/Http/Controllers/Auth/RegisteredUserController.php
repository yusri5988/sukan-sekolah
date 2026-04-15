<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SchoolReference;
use App\Services\SchoolService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(
        private SchoolService $schoolService
    ) {}

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $references = SchoolReference::query()
            ->where('is_used', false)
            ->orderBy('negeri')
            ->orderBy('nama')
            ->get(['id', 'nama', 'negeri']);

        return Inertia::render('Auth/Register', [
            'referencesByState' => $references
                ->groupBy('negeri')
                ->map(fn ($items) => $items->values())
                ->sortKeys()
                ->toArray(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'school_reference_id' => [
                'required',
                'integer',
                Rule::exists('school_references', 'id')->where(fn ($query) => $query->where('is_used', false)),
            ],
            'telefon' => ['required', 'string', 'max:20'],
        ]);

        $telefon = $this->formatPhoneNumber($validated['telefon']);

        $result = $this->schoolService->createSekolahFromReference(
            (int) $validated['school_reference_id'],
            $validated['nama'],
            $telefon
        );

        return redirect()
            ->route('register')
            ->with('success', 'Sekolah berjaya didaftarkan!')
            ->with('new_sekolah', $result->toArray());
    }

    private function formatPhoneNumber(string $phone): string
    {
        $digits = preg_replace('/[^0-9]/', '', $phone);

        if (str_starts_with($digits, '0')) {
            $digits = '6'.$digits;
        }

        return $digits;
    }
}
