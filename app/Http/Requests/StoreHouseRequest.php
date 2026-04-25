<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'color' => ['required', Rule::in(['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316', '#78350f', '#f8fafc', '#64748b'])],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('houses', 'name')->where(fn ($query) => $query->where('sekolah_id', $this->user()->sekolah_id)),
            ],
        ];
    }
}
