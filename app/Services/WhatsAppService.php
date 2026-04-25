<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.whatsapp.url');
        $this->apiKey = config('services.whatsapp.api_key');
    }

    public function sendOtp(string $phone, string $otp): bool
    {
        $message = "Kod OTP anda: *{$otp}*\n\n";
        $message .= "Kod ini sah selama 5 minit. Jangan kongsikan kod ini dengan sesiapa.\n\n";
        $message .= "- Sukan Sekolah";

        return $this->sendText($phone, $message);
    }

    public function sendText(string $phone, string $message): bool
    {
        try {
            $response = Http::timeout(10)
                ->withToken($this->apiKey)
                ->post("{$this->baseUrl}/send-text", [
                    'phone' => $phone,
                    'message' => $message,
                ]);

            if ($response->successful()) {
                Log::info('WhatsApp sent', ['phone' => $phone]);
                return true;
            }

            Log::warning('WhatsApp send failed', [
                'phone' => $phone,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('WhatsApp service error', [
                'phone' => $phone,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    public function checkHealth(): array
    {
        try {
            $response = Http::timeout(5)->get("{$this->baseUrl}/health");

            if ($response->successful()) {
                return $response->json();
            }

            return ['status' => 'unreachable'];
        } catch (\Exception $e) {
            return ['status' => 'unreachable', 'error' => $e->getMessage()];
        }
    }
}
