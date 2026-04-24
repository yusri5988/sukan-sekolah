<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminSekolahMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (! $this->canAccessRoute($request, $user)) {
            abort(403, 'Unauthorized. Admin Sekolah or Pengurus Acara access only.');
        }

        if (! $user->sekolah_id) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda. Sila hubungi Super Admin.');
        }

        return $next($request);
    }

    /**
     * Allow admin sekolah everywhere, pengurus acara only on events,
     * and pengurusan keputusan on results.
     */
    private function canAccessRoute(Request $request, User $user): bool
    {
        if ($user->isAdminSekolah()) {
            return true;
        }

        if ($user->isPengurusAcara()) {
            return $request->routeIs('admin-sekolah.events.*');
        }

        if ($user->isPengurusanKeputusan()) {
            return $request->routeIs(
                'admin-sekolah.events.index',
                'admin-sekolah.events.show',
                'admin-sekolah.results.*'
            );
        }

        return false;
    }
}
