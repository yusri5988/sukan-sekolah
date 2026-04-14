import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function TeachersCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.teachers.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <div>
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div className="w-8 h-[2px] bg-orange-600" />
                        <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Sumber Manusia</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Daftar <span className="text-orange-600">Guru Baru</span>
                    </h2>
                </div>
            }
        >
            <Head title="Daftar Guru" />

            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white border-4 border-slate-900 p-8 md:p-12 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Nama Penuh Guru</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-100 rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-bold text-slate-900"
                                placeholder="Cth: Ahmad bin Abu"
                            />
                            {errors.name && <div className="mt-2 text-red-600 text-xs font-bold italic">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Alamat Emel (Username)</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-100 rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-bold text-slate-900"
                                placeholder="Cth: ahmad@gmail.com"
                            />
                            {errors.email && <div className="mt-2 text-red-600 text-xs font-bold italic">{errors.email}</div>}
                            <p className="mt-2 text-slate-400 text-[10px] font-bold italic ml-1 uppercase">Emel ini akan digunakan untuk log masuk.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Kata Laluan</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-100 rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-bold text-slate-900"
                                    placeholder="Min 6 aksara"
                                />
                                {errors.password && <div className="mt-2 text-red-600 text-xs font-bold italic">{errors.password}</div>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Sahkan Kata Laluan</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-100 rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-bold text-slate-900"
                                />
                                {errors.password_confirmation && <div className="mt-2 text-red-600 text-xs font-bold italic">{errors.password_confirmation}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 px-8 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-2xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50"
                        >
                            {processing ? 'Mendaftarkan...' : 'Sahkan Pendaftaran'}
                        </button>
                        <Link
                            href={route('admin-sekolah.teachers.index')}
                            className="px-8 py-5 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all text-center"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminSekolahLayout>
    );
}
