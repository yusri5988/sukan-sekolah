<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ResetPasswordOtp;
use App\Services\WhatsAppService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    public function __construct(
        protected WhatsAppService $whatsApp
    ) {}

    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => 'required|string|max:20',
        ]);

        $phone = $this->formatPhone($request->phone);

        $user = User::where('telefon', $phone)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'phone' => [trans('No account found with this phone number.')],
            ]);
        }

        $otp = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('otp_codes')->insert([
            'phone' => $phone,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(5),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sent = $this->whatsApp->sendOtp($phone, $otp);

        if (! $sent) {
            Log::error('Failed to send OTP via WhatsApp', ['phone' => $phone]);

            return back()->with('status', 'Gagal menghantar OTP. Sila cuba lagi.');
        }

        return redirect()->route('password.reset', ['phone' => $phone])
            ->with('status', 'Kod OTP telah dihantar ke WhatsApp anda.');
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
