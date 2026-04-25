import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ phone, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone: phone || '',
        otp: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Kata Laluan" />

            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    Reset <span className="text-orange-600">Kata Laluan</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    Masukkan kod OTP dan cipta kata laluan baru
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-xs font-black uppercase tracking-widest text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="phone" value="Nombor Telefon" />

                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-2 block w-full bg-slate-50"
                        onChange={(e) => setData('phone', e.target.value)}
                        readOnly
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="otp" value="Kod OTP" />

                    <TextInput
                        id="otp"
                        type="text"
                        name="otp"
                        value={data.otp}
                        className="mt-2 block w-full text-center text-2xl tracking-[0.5em] font-bold"
                        autoComplete="off"
                        isFocused={true}
                        placeholder="000000"
                        maxLength={6}
                        onChange={(e) => setData('otp', e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    />

                    <InputError message={errors.otp} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Laluan Baru" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Sahkan Kata Laluan"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-6">
                    <PrimaryButton className="w-full justify-center py-4 text-sm" disabled={processing}>
                        Simpan Kata Laluan Baru
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
