import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function SekolahsShow() {
    const { sekolah } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-1 sm:mb-2">
                            <div className="w-6 sm:w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Profil Sekolah</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
                            {sekolah.nama}
                        </h2>
                    </div>
                    <Link
                        href={route('super-admin.sekolahs.index')}
                        className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={`Sekolah - ${sekolah.nama}`} />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                            {/* School Info Card */}
                            <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-3xl overflow-hidden">
                                <div className="bg-slate-50 px-6 sm:px-10 py-4 sm:py-6 border-b-2 sm:border-b-4 border-slate-900 flex items-center justify-between">
                                    <h3 className="text-lg sm:text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                                        Maklumat Sekolah
                                    </h3>
                                    <span className="px-3 py-1 bg-orange-100 border-2 border-orange-600 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest text-orange-600 italic">
                                        {sekolah.kod_sekolah}
                                    </span>
                                </div>
                                <div className="p-6 sm:p-10">
                                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Nama Sekolah</dt>
                                            <dd className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
                                                {sekolah.nama}
                                            </dd>
                                        </div>
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Alamat Lengkap</dt>
                                            <dd className="text-sm sm:text-base font-bold text-slate-600 italic leading-relaxed">
                                                {sekolah.alamat || 'Tiada Alamat'}
                                            </dd>
                                        </div>
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">No. Telefon</dt>
                                            <dd className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
                                                {sekolah.telefon || 'Tiada Telefon'}
                                            </dd>
                                        </div>
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Emel Sekolah</dt>
                                            <dd className="text-sm sm:text-base font-bold text-slate-600 italic break-all">
                                                {sekolah.email || 'Tiada Emel'}
                                            </dd>
                                        </div>
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Tarikh Dicipta</dt>
                                            <dd className="text-sm sm:text-base font-bold text-slate-600 italic">
                                                {new Date(sekolah.created_at).toLocaleDateString('ms-MY', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Teachers List Card */}
                            <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-3xl overflow-hidden">
                                <div className="bg-slate-50 px-6 sm:px-10 py-4 sm:py-6 border-b-2 sm:border-b-4 border-slate-900">
                                    <h3 className="text-lg sm:text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                                        Senarai Cikgu <span className="text-orange-600 tabular-nums">({sekolah.cikgus?.length || 0})</span>
                                    </h3>
                                </div>
                                <div className="p-0">
                                    {!sekolah.cikgus || sekolah.cikgus.length === 0 ? (
                                        <div className="py-12 sm:py-20 text-center">
                                            <p className="text-slate-400 font-bold italic text-base sm:text-lg">Belum ada cikgu berdaftar di sekolah ini.</p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-slate-100 border-b-2 border-slate-900">
                                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Bil</th>
                                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Nama Cikgu</th>
                                                        <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Emel</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y-2 divide-slate-100">
                                                    {sekolah.cikgus.map((cikgu, index) => (
                                                        <tr key={cikgu.id} className="hover:bg-orange-50/50 transition-colors group">
                                                            <td className="px-6 py-4 text-sm font-black italic text-slate-300 group-hover:text-orange-600 transition-colors">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4 text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900">
                                                                {cikgu.name}
                                                            </td>
                                                            <td className="px-6 py-4 text-[10px] sm:text-sm font-bold text-slate-500 italic">
                                                                {cikgu.email}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
                            <div className="bg-orange-600 border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-3xl overflow-hidden relative">
                                <div className="p-6 sm:p-10 relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white mb-6 sm:mb-8 border-b-2 border-white/20 pb-4">
                                        Admin Sekolah
                                    </h3>
                                    
                                    {sekolah.admin_sekolah ? (
                                        <div className="space-y-6 sm:space-y-8">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                                                <span className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
                                                    {sekolah.admin_sekolah.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/70 italic">Nama Penuh</div>
                                                    <div className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white leading-tight">
                                                        {sekolah.admin_sekolah.name}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/70 italic">Emel Rasmi</div>
                                                    <div className="text-sm sm:text-base font-bold text-white italic break-all">
                                                        {sekolah.admin_sekolah.email}
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest italic border border-white/10">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        Verified Admin
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <p className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs">Tiada Admin Dikesan</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats Sidebar */}
                            <div className="bg-slate-900 border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] sm:shadow-[8px_8px_0px_0px_rgba(234,88,12,1)] rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2">Sistem Status</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-xl sm:text-2xl font-black italic uppercase text-white tracking-tighter">Aktif</div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
