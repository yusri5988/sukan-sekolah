import PengurusAcaraLayout from '@/Layouts/PengurusAcaraLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventSelectionsIndex({ meet, selections }) {
    const categoryLabel = (code) => {
        const map = {
            track: 'Balapan',
            field: 'Padang',
            fun_games: 'Sukaneka',
        };
        return map[code] || code;
    };

    const statusBadge = (status) => {
        if (status === 'pending') {
            return (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Menunggu
                </span>
            );
        }
        if (status === 'configured') {
            return (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Siap
                </span>
            );
        }
        return (
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                {status}
            </span>
        );
    };

    const pendingCount = selections.filter(s => s.status === 'pending').length;

    return (
        <PengurusAcaraLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Pengurusan Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet?.name || 'Acara Induk'}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Acara Induk - Pengurus Acara" />

            <div className="space-y-6">
                {/* Info Bar */}
                {pendingCount > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-black text-yellow-900 text-sm uppercase tracking-wider italic">
                                {pendingCount} acara induk menunggu konfigurasi
                            </p>
                            <p className="text-xs text-yellow-700 font-bold italic">
                                Sila tetapkan tahun dan jantina untuk setiap acara.
                            </p>
                        </div>
                    </div>
                )}

                {selections.length === 0 ? (
                    <div className="text-center py-20 px-6">
                        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Tiada Acara Induk</h3>
                        <p className="text-slate-400 font-bold italic text-sm">
                            Admin Sekolah belum memilih sebarang acara induk.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selections.map((selection) => (
                            <div
                                key={selection.id}
                                className={`bg-white rounded-[2rem] border-2 p-6 transition-all hover:shadow-xl hover:shadow-slate-100 ${
                                    selection.status === 'pending'
                                        ? 'border-yellow-200 hover:border-yellow-400'
                                        : 'border-green-200 hover:border-green-400'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black italic uppercase"
                                        style={{ backgroundColor: selection.event_category?.color || '#0F172A' }}
                                    >
                                        {selection.template_name.charAt(0)}
                                    </div>
                                    {statusBadge(selection.status)}
                                </div>

                                <h3 className="text-2xl font-black uppercase italic text-slate-900 leading-tight mb-1">
                                    {selection.template_name}
                                </h3>

                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    {categoryLabel(selection.event_category?.code)} • {selection.type === 'relay' ? 'Relay' : 'Individu'}
                                </p>

                                {selection.events?.length > 0 && (
                                    <p className="text-xs font-bold text-slate-500 mb-4">
                                        {selection.events.length} acara telah dikonfigurasi
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 italic">
                                        Oleh: {selection.created_by?.name || '-'}
                                    </span>

                                    <Link
                                        href={route('pengurus-acara.event-selections.configure', selection.id)}
                                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            selection.status === 'pending'
                                                ? 'bg-orange-600 text-white hover:bg-orange-700'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {selection.status === 'pending' ? 'Konfigurasi' : 'Edit'}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PengurusAcaraLayout>
    );
}
