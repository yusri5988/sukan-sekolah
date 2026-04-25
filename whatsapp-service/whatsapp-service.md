# WhatsApp Service

Microservice untuk menghantar mesej WhatsApp menggunakan library [Baileys](https://github.com/WhiskeySockets/Baileys) (WhatsApp Web API tidak rasmi).

## Senibina

```
┌──────────────┐     HTTP      ┌──────────────────┐
│  Laravel App  │ ──────────►  │  WhatsApp Service │
│  (PHP)        │              │  (Node.js/Baileys)│
│               │ ◄──────────  │                   │
│ port: 80      │    JSON      │ port: 3001        │
└──────────────┘              └────────┬───────────┘
                                       │
                                       ▼
                               WhatsApp Web
                              (melalui Baileys)
```

## Keperluan Sistem

- Node.js 18+
- NPM

## Setup & Install

### 1. Clone / Copy folder `whatsapp-service`

```bash
cp -r whatsapp-service /path/to/project-baru/
cd /path/to/project-baru/whatsapp-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3001
API_KEY=change-this-to-a-random-secret-key
NODE_ENV=development
```

| Variable | Penerangan | Default |
|----------|------------|---------|
| `PORT` | Port service berjalan | `3001` |
| `API_KEY` | API key untuk authorize request dari Laravel | `dev-key` (fallback) |
| `NODE_ENV` | Environment | `development` |

### 4. Scan QR Code (First Time Only)

Jalankan service:

```bash
node server.js
```

Buka `http://localhost:3001/qr` di browser, scan QR code dengan WhatsApp > Linked Devices > Link a Device.

### 5. Production Mode (PM2)

```bash
npm run pm2
# atau
pm2 start ecosystem.config.js
```

## Integrasi Laravel

### Config (`config/services.php`)

```php
'whatsapp' => [
    'url' => env('WHATSAPP_SERVICE_URL', 'http://127.0.0.1:3001'),
    'api_key' => env('WHATSAPP_API_KEY', ''),
],
```

### Environment (`.env` projek Laravel)

```env
WHATSAPP_SERVICE_URL=http://127.0.0.1:3001
WHATSAPP_API_KEY=change-this-to-a-random-secret-key
```

> **Pastikan `WHATSAPP_API_KEY` sama dengan `API_KEY` dalam `.env` whatsapp-service.**

### Service Class (`app/Services/WhatsAppService.php`)

```php
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    public function sendOtp(string $phone, string $otp): bool
    {
        $message = "Kod OTP anda: *{$otp}*\n\n";
        $message .= "Kod ini sah selama 5 minit. Jangan kongsikan kod ini dengan sesiapa.\n\n";
        $message .= "- Nama Projek Anda";

        return $this->sendText($phone, $message);
    }

    public function sendText(string $phone, string $message): bool
    {
        $response = Http::timeout(10)
            ->withToken(config('services.whatsapp.api_key'))
            ->post(config('services.whatsapp.url') . '/send-text', [
                'phone' => $phone,
                'message' => $message,
            ]);

        return $response->successful();
    }
}
```

### Notification Channel (`app/Channels/WhatsAppChannel.php`)

Untuk guna dengan Laravel Notification:

```php
class WhatsAppChannel
{
    public function send(object $notifiable, Notification $notification): void
    {
        if (! $phone = $notifiable->routeNotificationFor('whatsapp', $notification)) {
            return;
        }

        $message = $notification->toWhatsApp($notifiable);

        app(WhatsAppService::class)->sendText($phone, $message);
    }
}
```

Dalam User model, tambah:

```php
public function routeNotificationForWhatsApp()
{
    return $this->telefon;
}
```

## Endpoints WhatsApp Service

| Method | Endpoint | Auth | Penerangan |
|--------|----------|------|------------|
| `GET` | `/health` | No | Status sambungan WhatsApp |
| `GET` | `/qr` | No | Papar QR code (HTML) |
| `GET` | `/status` | No | Status dalam JSON |
| `POST` | `/send-text` | Yes | Hantar mesej teks |
| `POST` | `/logout` | Yes | Logout WhatsApp |

### POST `/send-text`

Request:

```json
{
  "phone": "60193663437",
  "message": "Hello dari WhatsApp Service"
}
```

Headers:

```
Authorization: Bearer change-this-to-a-random-secret-key
```

Response:

```json
{
  "success": true,
  "result": { ... }
}
```

## Format Nombor Telefon

Service akan format automatik:

- Input: `0193663437` → `60193663437@s.whatsapp.net`
- Input: `60193663437` → `60193663437@s.whatsapp.net`
- Input: `+60193663437` → `60193663437@s.whatsapp.net`

> Nombor mesti bermula dengan kod negara `60` (Malaysia).

## Troubleshooting

### 401 Unauthorized

**Sebab:** API Key antara Laravel dan WhatsApp Service tak sama.

**Check:**
1. `whatsapp-service/.env` → `API_KEY=...`
2. Laravel `.env` → `WHATSAPP_API_KEY=...`
3. Run `php artisan config:clear` selepas update `.env`

### 503 WhatsApp not connected

**Sebab:** WhatsApp belum discan QR atau session expired.

**Fix:**
1. Buka `http://localhost:3001/qr`
2. Scan QR code
3. Atau restart service: `node server.js`

### Auth folder corrupt

Jika ada masalah session:

```bash
# Hentikan service dulu
rm -rf auth/
node server.js
# Scan QR semula
```

## Struktur Folder

```
whatsapp-service/
├── server.js              # Express server & routes
├── baileys-client.js      # Baileys WhatsApp client wrapper
├── ecosystem.config.js    # PM2 config
├── package.json
├── .env.example           # Template environment
├── .env                   # Environment config (JANGAN COMMIT)
├── auth/                  # Session data (JANGAN COMMIT)
├── logs/                  # Log files (JANGAN COMMIT)
└── node_modules/
```
