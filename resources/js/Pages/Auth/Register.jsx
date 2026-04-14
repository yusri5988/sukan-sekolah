import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Sekolah" />

            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    Daftar <span className="text-orange-600">Sekolah</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    Mula Transformasi Sukan Digital
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nama Penuh (Admin)" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Cikgu Ahmad"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Emel Rasmi" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        placeholder="ahmad@sekolah.edu.my"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Laluan" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Sahkan Kata Laluan"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-6">
                    <PrimaryButton className="w-full justify-center py-4 text-sm" disabled={processing}>
                        Daftar Sekarang
                    </PrimaryButton>
                </div>

                <div className="text-center pt-6 border-t-2 border-slate-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Sudah ada akaun? {' '}
                        <Link
                            href={route('login')}
                            className="text-orange-600 hover:text-slate-900 transition-colors underline decoration-2 underline-offset-4"
                        >
                            Log Masuk
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
