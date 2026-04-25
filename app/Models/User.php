<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'telefon', 'password', 'role', 'sekolah_id', 'house_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public const ROLE_SUPER_ADMIN = 'super_admin';

    public const ROLE_ADMIN_SEKOLAH = 'admin_sekolah';

    public const ROLE_CIKGU = 'cikgu';

    public const ROLE_CIKGU_SUKAN = 'cikgu_sukan';

    public const ROLE_PENGURUS_ACARA = 'pengurus_acara';

    public const ROLE_PENGURUSAN_KEPUTUSAN = 'pengurusan_keputusan';

    /**
     * Teacher-like roles that should be treated as cikgu in the app.
     *
     * @return array<int, string>
     */
    public static function teacherRoles(): array
    {
        return [
            self::ROLE_CIKGU,
            self::ROLE_CIKGU_SUKAN,
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === self::ROLE_SUPER_ADMIN;
    }

    /**
     * Check if user is admin sekolah
     */
    public function isAdminSekolah(): bool
    {
        return $this->role === self::ROLE_ADMIN_SEKOLAH;
    }

    /**
     * Check if user is cikgu
     */
    public function isCikgu(): bool
    {
        return in_array($this->role, self::teacherRoles(), true);
    }

    /**
     * Check if user is the special sports teacher role.
     */
    public function isCikguSukan(): bool
    {
        return $this->role === self::ROLE_CIKGU_SUKAN;
    }

    /**
     * Check if user is event manager.
     */
    public function isPengurusAcara(): bool
    {
        return $this->role === self::ROLE_PENGURUS_ACARA;
    }

    /**
     * Check if user is results manager (pengurusan keputusan).
     */
    public function isPengurusanKeputusan(): bool
    {
        return $this->role === self::ROLE_PENGURUSAN_KEPUTUSAN;
    }

    /**
     * Get the sekolah associated with the user
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get the house assigned to the teacher
     */
    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }

    public function routeNotificationForWhatsApp()
    {
        return $this->telefon;
    }
}
