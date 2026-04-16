import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
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

            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    Log <span className="text-orange-600">Masuk</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    Selamat Kembali, Hero Sukan!
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-xs font-black uppercase tracking-widest text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Emel" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nama@sekolah.edu.my"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div>
                        <InputLabel htmlFor="password" value="Kata Laluan" />
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                            setData('remember', e.target.checked)
                        }
                    />
                    <span className="ms-3 text-[10px] font-black uppercase tracking-widest text-slate-600">
                        Ingat Saya
                    </span>
                </div>

                <div className="pt-4">
                    <PrimaryButton className="w-full justify-center py-4 text-sm" disabled={processing}>
                        Masuk Sekarang
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4 border-t-2 border-slate-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Belum ada akaun? {' '}
                        <Link
                            href={route('register')}
                            className="text-orange-600 hover:text-slate-900 transition-colors underline decoration-2 underline-offset-4"
                        >
                            Daftar Sekolah
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
