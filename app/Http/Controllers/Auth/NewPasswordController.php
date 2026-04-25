<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'phone' => $request->phone,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => 'required|string|max:20',
            'otp' => 'required|string|size:6',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $phone = $this->formatPhone($request->phone);

        $otpRecord = DB::table('otp_codes')
            ->where('phone', $phone)
            ->where('otp', $request->otp)
            ->whereNull('verified_at')
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (! $otpRecord) {
            throw ValidationException::withMessages([
                'otp' => ['Kod OTP tidak sah atau telah tamat tempoh.'],
            ]);
        }

        DB::table('otp_codes')
            ->where('id', $otpRecord->id)
            ->update(['verified_at' => now()]);

        $user = User::where('telefon', $phone)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'phone' => ['No account found with this phone number.'],
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));

        DB::table('otp_codes')
            ->where('phone', $phone)
            ->delete();

        return redirect()->route('login')->with('status', 'Kata laluan berjaya dikemaskini. Sila log masuk.');
    }

    protected function formatPhone(string $phone): string
    {
        $clean = preg_replace('/[^0-9]/', '', $phone);

        if (strlen($clean) === 10 && str_starts_with($clean, '0')) {
            $clean = '6' . $clean;
        } elseif (strlen($clean) === 9 && str_starts_with($clean, '0')) {
            $clean = '60' . $clean;
        }

        if (! str_starts_with($clean, '60')) {
            $clean = '60' . $clean;
        }

        return $clean;
    }
}
