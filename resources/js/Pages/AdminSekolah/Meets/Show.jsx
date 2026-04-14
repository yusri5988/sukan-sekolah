import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function MeetsShow({ meet }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <Link 
                                href={route('admin-sekolah.meets.index')}
                                className="text-orange-600 hover:text-slate-900 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7 7-7" /></svg>
                            </Link>
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Butiran Kejohanan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('admin-sekolah.meets.edit', meet.id)}
                            className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all shadow-lg shadow-slate-100"
                        >
                            Edit Meet
                        </Link>
                        <Link
                            href={route('admin-sekolah.events.index', meet.id)}
                            className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                        >
                            Urus Acara
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={meet.name} />

            <div className="space-y-8">
                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info Card */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border-4 border-slate-900 p-8 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 border-2 border-slate-900">
                                            {new Date(meet.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic border-2 ${
                                            meet.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            meet.status === 'completed' ? 'bg-slate-50 text-slate-400 border-slate-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {meet.status === 'active' ? '● Aktif' :
                                             meet.status === 'completed' ? '✓ Selesai' : '✎ Draf'}
                                        </span>
                                    </div>
                                    {meet.is_public && (
                                        <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-blue-100 italic animate-pulse">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                            Paparan Awam Aktif
                                        </span>
                                    )}
                                </div>

                                {meet.description && (
                                    <div className="mb-10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 italic">Perincian Kejohanan</h4>
                                        <p className="text-xl font-bold text-slate-600 italic leading-relaxed">{meet.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                                    {[
                                        { label: 'Mata Johan', val: meet.point_config?.['1'] || 5, color: 'text-yellow-500' },
                                        { label: 'Naib Johan', val: meet.point_config?.['2'] || 3, color: 'text-slate-400' },
                                        { label: 'Ketiga', val: meet.point_config?.['3'] || 1, color: 'text-orange-400' }
                                    ].map((pt, i) => (
                                        <div key={i} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 text-center">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{pt.label}</div>
                                            <div className={`text-4xl font-black italic tabular-nums ${pt.color}`}>{pt.val}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 pt-10 border-t-4 border-slate-900">
                                    {meet.status === 'draft' && (
                                        <form action={route('admin-sekolah.meets.activate', meet.id)} method="POST" className="flex-1 min-w-[200px]">
                                            <button
                                                type="submit"
                                                className="w-full px-8 py-4 bg-emerald-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                                            >
                                                Mula Kejohanan Now!
                                            </button>
                                        </form>
                                    )}
                                    
                                    {meet.status === 'active' && (
                                        <form action={route('admin-sekolah.meets.complete', meet.id)} method="POST" className="flex-1 min-w-[200px]">
                                            <button
                                                type="submit"
                                                className="w-full px-8 py-4 bg-slate-400 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-slate-100"
                                            >
                                                Tandai Selesai
                                            </button>
                                        </form>
                                    )}

                                    <form action={route('admin-sekolah.meets.toggle-public', meet.id)} method="POST" className="flex-1 min-w-[200px]">
                                        <button
                                            type="submit"
                                            className={`w-full px-8 py-4 text-sm font-black uppercase tracking-widest italic rounded-xl transition-all shadow-xl ${
                                                meet.is_public
                                                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-100'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                                            }`}
                                        >
                                            {meet.is_public ? 'Tutup Paparan Awam' : 'Buka Paparan Awam'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Events Table Section */}
                        <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                            <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white leading-none">Senarai Acara</h3>
                                <Link 
                                    href={route('admin-sekolah.events.create', meet.id)}
                                    className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors"
                                >
                                    + Tambah Acara
                                </Link>
                            </div>
                            
                            <div className="p-0">
                                {meet.events && meet.events.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b-4 border-slate-900">
                                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest italic text-slate-500">Bil</th>
                                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest italic text-slate-500">Nama Acara</th>
                                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest italic text-slate-500">Kategori</th>
                                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest italic text-slate-500">Jenis</th>
                                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest italic text-slate-500">Masa</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y-2 divide-slate-100">
                                                {meet.events.map((event, index) => (
                                                    <tr key={event.id} className="hover:bg-slate-50 group transition-colors">
                                                        <td className="px-6 py-5 text-sm font-black italic text-slate-400 group-hover:text-slate-900 tabular-nums">
                                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="text-sm font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-orange-600 transition-colors">
                                                                {event.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                                                                {event.category} ({event.gender === 'male' ? 'L' : 'P'})
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5 text-xs font-bold text-slate-500 italic uppercase">
                                                            {event.type}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-900">
                                                                <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                                                                {event.scheduled_time || 'N/A'}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-20 text-center">
                                        <p className="text-2xl font-black italic uppercase tracking-tighter text-slate-300 mb-8">Belum Ada Acara</p>
                                        <Link
                                            href={route('admin-sekolah.events.create', meet.id)}
                                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-100"
                                        >
                                            + Tambah Acara Pertama
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Quick Stats */}
                    <div className="space-y-8">
                         <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-6 relative z-10">Live Stats</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Jumlah Acara</div>
                                    <div className="text-4xl font-black italic text-white tabular-nums">{meet.events?.length || 0}</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status Meet</div>
                                    <div className="text-2xl font-black italic text-orange-500 uppercase tracking-tighter">
                                        {meet.status === 'active' ? 'Kejohanan Berlangsung' :
                                         meet.status === 'completed' ? 'Tamat Sepenuhnya' : 'Persediaan Draf'}
                                    </div>
                                </div>
                            </div>
                            {/* Texture Overlay */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/20 blur-3xl rounded-full" />
                         </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
