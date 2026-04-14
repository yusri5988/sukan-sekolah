import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function SekolahsIndex() {
    const { sekolahs } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Sistem</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Senarai <span className="text-orange-600">Sekolah</span>
                        </h2>
                    </div>
                    <Link
                        href={route('super-admin.sekolahs.create')}
                        className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-[6px_6px_0px_0px_rgba(234,88,12,1)]"
                    >
                        + Tambah Sekolah Baru
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Sekolah" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {sekolahs.data.length === 0 ? (
                        <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-[2rem] p-20 text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-slate-400">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">
                                Belum Ada Sekolah Berdaftar
                            </h3>
                            <p className="text-lg font-bold text-slate-500 italic mb-10">
                                Mula membina ekosistem sukan anda dengan menambah sekolah pertama.
                            </p>
                            <Link
                                href={route('super-admin.sekolahs.create')}
                                className="px-10 py-5 bg-orange-600 text-white text-xl font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-900 transition-all shadow-2xl active:scale-95 inline-block"
                            >
                                Tambah Sekolah Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] rounded-[2.5rem] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-900 text-white">
                                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Bil
                                            </th>
                                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Nama Sekolah
                                            </th>
                                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Kod Sekolah
                                            </th>
                                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Admin Sekolah
                                            </th>
                                            <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Status
                                            </th>
                                            <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] italic">
                                                Tindakan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-4 divide-slate-50">
                                        {sekolahs.data.map((sekolah, index) => (
                                            <tr key={sekolah.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <span className="text-xl font-black italic tabular-nums text-slate-300 group-hover:text-orange-600 transition-colors">
                                                        {(sekolahs.current_page - 1) * sekolahs.per_page + index + 1}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
                                                        {sekolah.nama}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                        {sekolah.negeri || sekolah.telefon || 'Tiada Maklumat'}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-slate-100 border-2 border-slate-900 rounded-lg text-xs font-black uppercase tracking-widest text-slate-900 italic shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                                                        {sekolah.kod_sekolah}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {sekolah.admin_sekolah ? (
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">
                                                                {sekolah.admin_sekolah.name.charAt(0)}
                                                            </div>
                                                            <div className="text-sm font-black uppercase text-slate-700 italic">
                                                                {sekolah.admin_sekolah.name}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-red-500">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                            <span className="text-[10px] font-black uppercase tracking-widest italic">Tiada Admin</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Aktif</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <Link
                                                        href={route('super-admin.sekolahs.show', sekolah.id)}
                                                        className="inline-flex items-center px-6 py-2 bg-white border-2 border-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest italic text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none active:translate-y-0.5"
                                                    >
                                                        Details →
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {sekolahs.last_page > 1 && (
                                <div className="bg-slate-50 border-t-4 border-slate-900 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                                        Menunjukkan <span className="text-slate-900">{sekolahs.from}</span> hingga <span className="text-slate-900">{sekolahs.to}</span> dari <span className="text-slate-900">{sekolahs.total}</span> sekolah
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {sekolahs.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all border-2 border-slate-900 ${
                                                    link.active
                                                        ? 'bg-slate-900 text-white shadow-none'
                                                        : 'bg-white text-slate-900 hover:bg-slate-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-none'
                                                } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
