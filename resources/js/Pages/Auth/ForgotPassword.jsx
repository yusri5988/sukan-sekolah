import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Laluan" />

            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    Lupa <span className="text-orange-600">Kata Laluan</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">
                    Jangan risau, hero pun boleh lupa! Kami bantu hantarkan link reset.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-xs font-black uppercase tracking-widest text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        isFocused={true}
                        placeholder="Masukkan alamat emel anda"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <PrimaryButton className="w-full justify-center py-4 text-sm" disabled={processing}>
                        Hantar Link Reset
                    </PrimaryButton>
                </div>

                <div className="text-center pt-4 border-t-2 border-slate-50">
                    <Link
                        href={route('login')}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors underline decoration-2 underline-offset-4"
                    >
                        Kembali ke Log Masuk
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
