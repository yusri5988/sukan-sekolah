<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ensure the request is from an authenticated teacher (cikgu).
 * Requires the user to be logged in, have role CIKGU, and be linked to a sekolah.
 */
class CikguMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (! $user || ! $user->isCikgu() || ! $user->sekolah_id) {
            abort(403, 'Akses dibenarkan hanya untuk cikgu yang mempunyai sekolah.');
        }

        return $next($request);
    }
}
