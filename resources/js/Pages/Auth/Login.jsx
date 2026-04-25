import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log Masuk" />

            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Selamat <span className="text-orange-600">Kembali</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                    Log masuk ke akaun anda untuk meneruskan.
                </p>
            </div>

            {status && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="group transition-all">
                    <InputLabel htmlFor="email" value="Alamat Emel" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nama@sekolah.edu.my"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="group transition-all">
                    <div className="flex justify-between items-center">
                                <InputLabel htmlFor="password" value="Kata Laluan" className="mb-0" />
                                        <Link href={route('password.request')} className="text-[10px] font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2">
                                            Lupa?
                                        </Link>
                                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="current-password"
                        placeholder="Masukkan kata laluan"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    <span className="ms-3 text-xs font-semibold text-slate-500 cursor-pointer select-none" onClick={() => setData('remember', !data.remember)}>
                        Ingat sesi saya
                    </span>
                </div>

                <div className="pt-1">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Log Masuk
                    </PrimaryButton>
                </div>

                <div className="text-center pt-6 border-t border-slate-50">
                    <p className="text-xs font-medium text-slate-400">
                        Belum ada akaun? {' '}
                        <Link
                            href={route('register')}
                            className="text-orange-600 hover:text-orange-700 font-bold transition-all ml-1 underline underline-offset-4 decoration-orange-200 hover:decoration-orange-600"
                        >
                            Daftar Sekolah
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
