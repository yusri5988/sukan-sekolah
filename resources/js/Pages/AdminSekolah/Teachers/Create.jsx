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
                <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 mb-1">
                        <div className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.3em]">Pengurusan Kakitangan</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Daftar <span className="text-orange-600">Guru Baru</span>
                    </h2>
                </div>
            }
        >
            <Head title="Daftar Guru" />

            <div className="max-w-2xl mt-4">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="bg-white border-2 md:border-4 border-slate-900 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] space-y-5 md:space-y-6">
                        
                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Nama Penuh Guru</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3.5 md:px-5 md:py-4 bg-slate-50 border-2 border-slate-200 rounded-xl md:rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-black uppercase text-sm md:text-base text-slate-900 placeholder:text-slate-300 placeholder:italic shadow-inner"
                                placeholder="CTH: AHMAD BUKHARI"
                            />
                            {errors.name && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Alamat Emel (Username)</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3.5 md:px-5 md:py-4 bg-slate-50 border-2 border-slate-200 rounded-xl md:rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-black text-sm md:text-base text-slate-900 placeholder:text-slate-300 placeholder:italic placeholder:font-bold shadow-inner"
                                placeholder="cikgu@sekolah.edu.my"
                            />
                            {errors.email ? (
                                <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.email}</div>
                            ) : (
                                <p className="mt-2 text-slate-400 text-[9px] font-bold italic ml-1 uppercase tracking-widest">Akan digunakan untuk log masuk.</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-2">
                            <div>
                                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Kata Laluan</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3.5 md:px-5 md:py-4 bg-slate-50 border-2 border-slate-200 rounded-xl md:rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-black text-sm md:text-base text-slate-900 placeholder:text-slate-300 placeholder:italic shadow-inner"
                                    placeholder="••••••••"
                                />
                                {errors.password && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.password}</div>}
                            </div>

                            <div>
                                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Sahkan Kata Laluan</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3.5 md:px-5 md:py-4 bg-slate-50 border-2 border-slate-200 rounded-xl md:rounded-2xl focus:border-orange-600 focus:ring-0 transition-all font-black text-sm md:text-base text-slate-900 placeholder:text-slate-300 placeholder:italic shadow-inner"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.password_confirmation}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:flex-1 px-8 py-4 bg-slate-900 text-white text-[11px] md:text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none"
                        >
                            {processing ? 'Menyimpan...' : 'Sahkan Pendaftaran'}
                        </button>
                        <Link
                            href={route('admin-sekolah.teachers.index')}
                            className="w-full sm:w-1/3 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 text-[11px] md:text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminSekolahLayout>
    );
}
