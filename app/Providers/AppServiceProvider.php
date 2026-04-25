<?php

namespace App\Providers;

use App\Channels\WhatsAppChannel;
use App\Models\House;
use App\Policies\HousePolicy;
use App\Services\WhatsAppService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(WhatsAppService::class, function () {
            return new WhatsAppService;
        });
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::policy(House::class, HousePolicy::class);

        $this->app->when(WhatsAppChannel::class)
            ->needs(WhatsAppService::class)
            ->give(function () {
                return new WhatsAppService;
            });
    }
}
