import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function CikguStudentsIndex({ students, sekolah, myHouse }) {
    const { flash } = usePage().props;

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900">
                            Senarai Pelajar
                        </h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">
                            Rumah {myHouse?.name}
                        </p>
                    </div>
                    {myHouse && (
                        <Link
                            href={route('cikgu.students.create')}
                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-orange-600 transition-all active:scale-95 border-b-4 border-orange-600"
                        >
                            <span className="text-sm font-black uppercase tracking-widest italic">+ Tambah Pelajar</span>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title={`Pelajar Rumah ${myHouse?.name}`} />

            <div className="space-y-6">
                
                {/* Flash Messages */}
                {(flash?.error || flash?.success) && (
                    <div className="space-y-2">
                        {flash?.error && (
                            <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl text-red-800 font-bold text-xs text-center">
                                {flash.error}
                            </div>
                        )}
                        {flash?.success && (
                            <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-xl text-emerald-800 font-bold text-xs text-center">
                                {flash.success}
                            </div>
                        )}
                    </div>
                )}

                {/* Students Summary Card */}
                {myHouse && (
                    <div className="bg-blue-600 px-5 py-4 rounded-2xl text-white shadow-md flex items-center justify-between overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-200 mb-0.5">Jumlah Pelajar Rumah {myHouse.name}</div>
                            <div className="text-3xl font-black italic tabular-nums">{students.length} Orang</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Students List Container */}
                <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                    <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
                        <h3 className="text-white text-xs font-black uppercase italic tracking-tight">Senarai Nama</h3>
                        <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest italic">{students.length} Pelajar</span>
                    </div>
                    
                    {students.length === 0 ? (
                        <div className="px-5 py-12 text-center">
                            <div className="text-slate-200 mb-2 text-4xl font-black italic opacity-20 select-none">KOSONG</div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic mb-4">Tiada pelajar berdaftar.</p>
                            {myHouse && (
                                <Link
                                    href={route('cikgu.students.create')}
                                    className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition-colors"
                                >
                                    Mula Peruntukan Pelajar
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {students.map((student) => (
                                <div key={student.id} className="px-5 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 group">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-black uppercase tracking-tight text-slate-900 leading-tight truncate text-sm">
                                            {student.name}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                {student.class}
                                            </span>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">
                                                Tahun {student.year}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Guide if empty */}
                {students.length > 0 && (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-2xl text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                            Semua pelajar ini adalah ahli rasmi Rumah {myHouse?.name}.
                        </p>
                    </div>
                )}
            </div>
        </CikguLayout>
    );
}
