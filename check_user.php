<?php

require __DIR__.'/vendor/autoload.php';
use App\Models\User;

echo User::exists() ? 'User exists' : 'No users';
