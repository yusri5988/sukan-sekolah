import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SekolahsShow() {
    const { sekolah } = usePage().props;
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        if (sekolah.admin_sekolah?.email) {
            navigator.clipboard.writeText(sekolah.admin_sekolah.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

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
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Negeri</dt>
                                            <dd className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
                                                {sekolah.negeri || '-'}
                                            </dd>
                                        </div>
                                        <div className="space-y-1">
                                            <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Nombor Telefon</dt>
                                            <dd className="text-lg sm:text-xl font-black italic tracking-tighter text-slate-900 leading-tight">
                                                {sekolah.telefon ? (
                                                    <a
                                                        href={`https://api.whatsapp.com/send/?phone=${sekolah.telefon.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                                                    >
                                                        {sekolah.telefon}
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                        </svg>
                                                    </a>
                                                ) : '-'}
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
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-sm sm:text-base font-bold text-white italic break-all">
                                                            {sekolah.admin_sekolah.email}
                                                        </div>
                                                        <button
                                                            onClick={copyEmail}
                                                            className="flex-shrink-0 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
                                                            title="Salin emel"
                                                        >
                                                            {copied ? (
                                                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                    {copied && (
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">
                                                            Emel disalin!
                                                        </div>
                                                    )}
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
