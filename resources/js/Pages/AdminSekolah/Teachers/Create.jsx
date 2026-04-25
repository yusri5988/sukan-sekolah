import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function TeachersCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telefon: '',
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
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2 mb-2 w-full justify-center">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Pengurusan Kakitangan</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Daftar <span className="text-orange-600">Guru Baru</span>
                    </h2>
                    <Link
                        href={route('admin-sekolah.teachers.index')}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Guru" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 opacity-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
                        <div className="p-6 sm:p-10 relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                                {/* Maklumat Akaun Section */}
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Maklumat Akaun</h3>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>

                                    <div className="space-y-5 sm:space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2 ml-1">Nama Penuh Guru</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300 placeholder:italic"
                                                placeholder="CTH: AHMAD BUKHARI"
                                            />
                                            {errors.name && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.name}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2 ml-1">Alamat Emel (Username)</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300 placeholder:italic"
                                                placeholder="cikgu@sekolah.edu.my"
                                            />
                                            {errors.email ? (
                                                <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.email}</div>
                                            ) : (
                                                <p className="mt-2 text-slate-400 text-[9px] font-bold italic ml-1 uppercase tracking-widest">Akan digunakan untuk log masuk.</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2 ml-1">Nombor Telefon</label>
                                            <input
                                                type="tel"
                                                value={data.telefon}
                                                onChange={(e) => setData('telefon', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300 placeholder:italic"
                                                placeholder="011-12345678"
                                            />
                                            {errors.telefon && (
                                                <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.telefon}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Kata Laluan Section */}
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Kata Laluan</h3>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2 ml-1">Kata Laluan</label>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300 placeholder:italic"
                                                placeholder="••••••••"
                                            />
                                            {errors.password && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.password}</div>}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2 ml-1">Sahkan Kata Laluan</label>
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300 placeholder:italic"
                                                placeholder="••••••••"
                                            />
                                            {errors.password_confirmation && <div className="mt-2 text-red-600 text-[10px] font-bold italic uppercase tracking-widest px-1">{errors.password_confirmation}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 pt-6 sm:pt-10 border-t-2 sm:border-t-4 border-slate-50">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-orange-600 text-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        {processing ? 'MEMPROSES...' : 'DAFTAR GURU →'}
                                    </button>
                                    <Link
                                        href={route('admin-sekolah.teachers.index')}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-slate-900 hover:bg-slate-50 transition-all active:scale-95 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
