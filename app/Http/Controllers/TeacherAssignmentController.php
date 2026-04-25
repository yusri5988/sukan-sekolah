<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\User;
use App\Services\TeacherAssignmentService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

/**
 * Handles teacher (cikgu) house assignment UI for admin sekolah.
 */
class TeacherAssignmentController extends Controller
{
    /**
     * Render the assignment management page.
     */
    public function page()
    {
        $admin = Auth::user();
        $school = $admin->sekolah;
        if (! $school) {
            abort(403, 'Akaun anda tidak dihubungkan dengan mana-mana sekolah.');
        }
        $service = app(TeacherAssignmentService::class);
        $teachers = $service->getTeachersWithHouse($school);
        $houses = House::where('sekolah_id', $school->id)->get();

        return Inertia::render('AdminSekolah/Teachers/Assignments', [
            'teachers' => $teachers,
            'houses' => $houses,
        ]);
    }

    protected TeacherAssignmentService $service;

    public function __construct(TeacherAssignmentService $service)
    {
        $this->service = $service;
    }

    /**
     * Show list of teachers with their current house assignments.
     * Returns JSON for simplicity; UI can consume as needed.
     */
    public function index()
    {
        $admin = Auth::user();
        $school = $admin->sekolah;

        $teachers = $this->service->getTeachersWithHouse($school);
        $houses = House::where('sekolah_id', $school->id)->get();

        return Response::json([
            'teachers' => $teachers,
            'houses' => $houses,
        ]);
    }

    /**
     * Update a teacher's house assignment.
     *
     * @param  User  $teacher  (Route‑model bound, must be a teacher)
     */
    public function update(Request $request, User $teacher)
    {
        $admin = Auth::user();
        $school = $admin->sekolah;

        // Basic validations
        $data = $request->validate([
            'house_id' => ['nullable', 'exists:houses,id'],
        ]);

        // Ensure the teacher belongs to the same school
        if ($teacher->sekolah_id !== $school->id) {
            return Response::json(['error' => 'Teacher does not belong to your school.'], 403);
        }

        // If a house is provided, ensure it belongs to the same school
        if (! is_null($data['house_id'])) {
            $house = House::findOrFail($data['house_id']);
            if ($house->sekolah_id !== $school->id) {
                return Response::json(['error' => 'House does not belong to your school.'], 403);
            }
            $this->service->assign($teacher, $house);
        } else {
            $this->service->unassign($teacher);
        }

        return Response::json(['message' => 'Assignment updated successfully.']);
    }

    /**
     * Appoint a teacher to a specific role.
     *
     * @param  User  $teacher  (Route‑model bound, must be a teacher)
     */
    public function appoint(Request $request, User $teacher)
    {
        $admin = Auth::user();
        $school = $admin->sekolah;

        $data = $request->validate([
            'role' => ['required', Rule::in([
                User::ROLE_CIKGU_SUKAN,
                User::ROLE_PENGURUS_ACARA,
                User::ROLE_PENGURUSAN_KEPUTUSAN,
            ])],
            'house_id' => ['nullable', 'required_if:role,' . User::ROLE_CIKGU_SUKAN, 'exists:houses,id'],
        ]);

        // Ensure the teacher belongs to the same school
        if ($teacher->sekolah_id !== $school->id) {
            return Response::json(['error' => 'Teacher does not belong to your school.'], 403);
        }

        $teacher->role = $data['role'];

        if ($data['role'] === User::ROLE_CIKGU_SUKAN && ! is_null($data['house_id'])) {
            $house = House::findOrFail($data['house_id']);
            if ($house->sekolah_id !== $school->id) {
                return Response::json(['error' => 'House does not belong to your school.'], 403);
            }
            $teacher->house_id = $house->id;
        } elseif ($data['role'] !== User::ROLE_CIKGU_SUKAN) {
            $teacher->house_id = null;
        }

        $teacher->save();

        return Response::json(['message' => 'Pelantikan berjaya.']);
    }
}
