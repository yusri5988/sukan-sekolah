<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PengurusAcaraMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        if (! $user->isPengurusAcara()) {
            abort(403, 'Unauthorized. Pengurus Acara access only.');
        }

        if (! $user->sekolah_id) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        return $next($request);
    }
}
