<?php

namespace App\Policies;

use App\Models\House;
use App\Models\User;

class HousePolicy
{
    public function access(User $user, House $house): bool
    {
        return $house->sekolah_id === $user->sekolah_id;
    }
}
