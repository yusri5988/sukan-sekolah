<?php

namespace App\Channels;

use App\Services\WhatsAppService;
use Illuminate\Notifications\Notification;

class WhatsAppChannel
{
    protected WhatsAppService $whatsApp;

    public function __construct(WhatsAppService $whatsApp)
    {
        $this->whatsApp = $whatsApp;
    }

    public function send(object $notifiable, Notification $notification): void
    {
        if (! $phone = $notifiable->routeNotificationFor('whatsapp', $notification)) {
            return;
        }

        $message = $notification->toWhatsApp($notifiable);

        $this->whatsApp->sendText($phone, $message);
    }
}
