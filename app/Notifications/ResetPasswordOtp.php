<?php

namespace App\Notifications;

use App\Channels\WhatsAppChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ResetPasswordOtp extends Notification
{
    use Queueable;

    public function __construct(
        public string $otp
    ) {}

    public function via(object $notifiable): array
    {
        return [WhatsAppChannel::class];
    }

    public function toWhatsApp(object $notifiable): string
    {
        $message = "Kod OTP anda: *{$this->otp}*\n\n";
        $message .= "Kod ini sah selama 5 minit. Jangan kongsikan kod ini dengan sesiapa.\n\n";
        $message .= "- Hari Sukan Malaysia";

        return $message;
    }
}
