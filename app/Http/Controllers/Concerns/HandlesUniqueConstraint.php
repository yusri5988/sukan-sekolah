<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Database\QueryException;

trait HandlesUniqueConstraint
{
    protected function handleUniqueConstraintError(QueryException $e, string $field = 'name', string $message = 'Nama rumah ini sudah wujud.')
    {
        if (str_contains($e->getMessage(), 'unique')) {
            return redirect()->back()
                ->withErrors([$field => $message])
                ->withInput();
        }

        throw $e;
    }
}
