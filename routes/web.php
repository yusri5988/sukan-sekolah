<?php

use App\Http\Controllers\AdminSekolahController;
use App\Http\Controllers\CikguController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventParticipantController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\MeetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicMeetController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\TeacherAssignmentController;
use App\Http\Controllers\TeacherController;
use App\Http\Middleware\AdminSekolahMiddleware;
use App\Http\Middleware\CikguMiddleware;
use App\Http\Middleware\SuperAdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->isSuperAdmin()) {
        return redirect()->route('super-admin.dashboard');
    }

    if ($user->isAdminSekolah()) {
        return redirect()->route('admin-sekolah.dashboard');
    }

    if ($user->isCikgu()) {
        return redirect()->route('cikgu.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/public/meets/{meet}', [PublicMeetController::class, 'show'])->name('public.meets.show');
Route::get('/public/meets/{meet}/ranking', [PublicMeetController::class, 'ranking'])->name('public.meets.ranking');

// Super Admin Routes
Route::middleware(['auth', SuperAdminMiddleware::class])->prefix('super-admin')->name('super-admin.')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/sekolahs', [SchoolController::class, 'index'])->name('sekolahs.index');
    Route::get('/sekolahs/create', [SchoolController::class, 'create'])->name('sekolahs.create');
    Route::post('/sekolahs', [SchoolController::class, 'store'])->name('sekolahs.store');
    Route::get('/sekolahs/{sekolah}', [SchoolController::class, 'show'])->name('sekolahs.show');
});

// Admin Sekolah Routes
Route::middleware(['auth', AdminSekolahMiddleware::class])->prefix('admin-sekolah')->name('admin-sekolah.')->group(function () {
    Route::get('/dashboard', [AdminSekolahController::class, 'dashboard'])->name('dashboard');

    // Teachers Management
    Route::get('/teachers', [TeacherController::class, 'index'])->name('teachers.index');
    Route::get('/teachers/create', [TeacherController::class, 'create'])->name('teachers.create');
    Route::post('/teachers', [TeacherController::class, 'store'])->name('teachers.store');
    Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

    // Teacher House Assignments
    Route::get('/teachers/assignments', [TeacherAssignmentController::class, 'page'])->name('teachers.assignments.index');
    Route::patch('/teachers/{teacher}/assignment', [TeacherAssignmentController::class, 'update'])->name('teachers.assignment.update');

    // Houses Management
    Route::get('/houses', [HouseController::class, 'index'])->name('houses.index');
    Route::get('/houses/create', [HouseController::class, 'create'])->name('houses.create');
    Route::post('/houses', [HouseController::class, 'store'])->name('houses.store');
    Route::get('/houses/{house}', [HouseController::class, 'show'])->name('houses.show');
    Route::delete('/houses/{house}', [HouseController::class, 'destroy'])->name('houses.destroy');
    Route::post('/houses/auto-assign', [HouseController::class, 'autoAssign'])->name('houses.auto-assign');

    // Students Management
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::get('/students/import', [StudentController::class, 'import'])->name('students.import');
    Route::get('/students/import/template', [StudentController::class, 'downloadTemplate'])->name('students.import.template');
    Route::post('/students/import', [StudentController::class, 'processImport'])->name('students.process-import');
    Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');

    // Meets Management - Single kejohanan per sekolah
    Route::get('/meets', [MeetController::class, 'index'])->name('meets.index');
    Route::get('/meets/{meet}', [MeetController::class, 'show'])->name('meets.show');
    Route::get('/meets/{meet}/edit', [MeetController::class, 'edit'])->name('meets.edit');
    Route::patch('/meets/{meet}', [MeetController::class, 'update'])->name('meets.update');
    Route::post('/meets/{meet}/activate', [MeetController::class, 'activate'])->name('meets.activate');
    Route::post('/meets/{meet}/complete', [MeetController::class, 'complete'])->name('meets.complete');
    Route::post('/meets/{meet}/toggle-public', [MeetController::class, 'togglePublic'])->name('meets.toggle-public');

    // Events Management
    Route::get('/meets/{meet}/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/meets/{meet}/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/meets/{meet}/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/meets/{meet}/events/{event}', [EventController::class, 'show'])->name('events.show');
    Route::get('/meets/{meet}/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::patch('/meets/{meet}/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::post('/meets/{meet}/events/{event}/toggle-active', [EventController::class, 'toggleActive'])->name('events.toggle-active');
    Route::delete('/meets/{meet}/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');

    // Event Participants Management
    Route::get('/meets/{meet}/events/{event}/participants', [EventParticipantController::class, 'index'])->name('events.participants.index');
    Route::get('/meets/{meet}/events/{event}/participants/create', [EventParticipantController::class, 'create'])->name('events.participants.create');
    Route::post('/meets/{meet}/events/{event}/participants', [EventParticipantController::class, 'store'])->name('events.participants.store');
    Route::post('/meets/{meet}/events/{event}/participants/{participant}/assign-lane', [EventParticipantController::class, 'assignLane'])->name('events.participants.assign-lane');
    Route::delete('/meets/{meet}/events/{event}/participants/{participant}', [EventParticipantController::class, 'destroy'])->name('events.participants.destroy');

    // Results Management
    Route::get('/meets/{meet}/events/{event}/results', [ResultController::class, 'index'])->name('results.index');
    Route::get('/meets/{meet}/events/{event}/results/create', [ResultController::class, 'create'])->name('results.create');
    Route::post('/meets/{meet}/events/{event}/results', [ResultController::class, 'store'])->name('results.store');
    Route::get('/meets/{meet}/events/{event}/results/{result}/edit', [ResultController::class, 'edit'])->name('results.edit');
    Route::patch('/meets/{meet}/events/{event}/results/{result}', [ResultController::class, 'update'])->name('results.update');
    Route::delete('/meets/{meet}/events/{event}/results/{result}', [ResultController::class, 'destroy'])->name('results.destroy');
    Route::post('/meets/{meet}/events/{event}/results/{result}/toggle-lock', [ResultController::class, 'toggleLock'])->name('results.toggle-lock');
    Route::get('/meets/{meet}/events/{event}/ranking', [ResultController::class, 'ranking'])->name('results.ranking');
});

// Cikgu Routes
Route::middleware(['auth', CikguMiddleware::class])->prefix('cikgu')->name('cikgu.')->group(function () {
    Route::get('/dashboard', [CikguController::class, 'dashboard'])->name('dashboard');
    Route::get('/students', [CikguController::class, 'studentIndex'])->name('students.index');
    Route::get('/students/create', [CikguController::class, 'studentCreate'])->name('students.create');
    Route::post('/students', [CikguController::class, 'studentStore'])->name('students.store');
    Route::get('/meets/{meet}/events/{event}/participants', [CikguController::class, 'participantIndex'])->name('events.participants.index');
    Route::post('/meets/{meet}/events/{event}/participants', [CikguController::class, 'participantStore'])->name('events.participants.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
