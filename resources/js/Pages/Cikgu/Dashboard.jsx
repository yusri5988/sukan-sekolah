import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function CikguDashboard({ stats, houses, sekolah, myHouse }) {
    const { flash } = usePage().props;

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {sekolah.nama}
                        </h2>
                    </div>
                    {myHouse ? (
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Rumah Saya</div>
                            <div className="text-sm font-black uppercase tracking-widest">{myHouse.name}</div>
                        </div>
                    ) : (
                        <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-xl shadow-xl border-2 border-amber-300">
                            <div className="text-[10px] font-black uppercase tracking-widest">Belum Dilantik</div>
                            <div className="text-sm font-black">Rumah dipadam / belum ditetapkan</div>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={`Dashboard Cikgu | ${sekolah.nama}`} />

            <div className="space-y-12">
                {flash?.error && (
                    <div className="rounded-[2rem] border-4 border-red-400 bg-red-50 p-6 shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold italic text-red-900">{flash.error}</div>
                    </div>
                )}

                {!myHouse && (
                    <div className="bg-amber-50 border-4 border-amber-400 p-8 rounded-[2rem]">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-amber-900 mb-2">
                                    Lantikan Diperlukan
                                </h3>
                                <p className="text-amber-800 font-bold leading-relaxed">
                                    Admin sekolah perlu melantik anda kepada sebuah rumah sukan terlebih dahulu, atau menetapkan semula jika rumah anda telah dipadam.
                                </p>
                                <p className="text-amber-700 text-sm mt-3 font-semibold">
                                    Sila hubungi admin sekolah untuk tindakan lanjut.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            label: 'Pelajar Rumah Saya',
                            value: stats.total_students,
                            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                            color: myHouse ? 'blue' : 'slate',
                        },
                        {
                            label: 'Jumlah Rumah',
                            value: stats.total_houses,
                            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                            color: 'orange',
                        },
                        {
                            label: 'Belum Ada Rumah',
                            value: stats.students_without_house,
                            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
                            color: 'red',
                        },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-50 border-4 border-slate-900 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 transition-transform group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 group-hover:text-slate-900 transition-colors">
                                        {stat.label}
                                    </div>
                                    <div className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 tabular-nums">
                                        {stat.value}
                                    </div>
                                </div>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                                    stat.color === 'blue' ? 'bg-blue-600' :
                                    stat.color === 'orange' ? 'bg-orange-600' :
                                    stat.color === 'red' ? 'bg-red-600' :
                                    'bg-slate-600'
                                } text-white transform group-hover:rotate-12 transition-transform shadow-xl`}>
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {myHouse && (
                    <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden uppercase font-black text-[10vw] leading-none text-white flex flex-col gap-0 items-center justify-center rotate-[-10deg]">
                            <div>{myHouse.name}</div>
                        </div>
                        <div className="relative z-10">
                            <div className="px-10 py-8 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Rumah {myHouse.name}</h3>
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                                        <div className="text-5xl font-black italic text-white mb-2">{stats.total_students}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pelajar Aktif</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                                        <div className="text-5xl font-black italic text-white mb-2">{myHouse.points || 0}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">Mata Terkumpul</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                                        <div className="text-5xl font-black italic text-white mb-2">
                                            {houses.filter(h => h.id !== myHouse.id && h.points > (myHouse.points || 0)).length + 1}
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kedudukan</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 leading-none">Pengurusan Pelajar</h3>
                            <p className="text-slate-500 font-bold mb-8 italic">
                                Lihat dan tambah pelajar {myHouse ? `rumah ${myHouse.name}` : 'di sekolah anda'}.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('cikgu.students.index')}
                                    className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 inline-block shadow-xl shadow-slate-200"
                                >
                                    Senarai Pelajar
                                </Link>
                                {myHouse && (
                                    <Link
                                        href={route('cikgu.students.create')}
                                        className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100"
                                    >
                                        + Tambah Pelajar
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                    </div>

                    {myHouse && (
                        <div className="bg-orange-50 border-4 border-orange-600 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(234,88,12,1)] relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-orange-900 mb-4 leading-none">Pendaftaran Acara</h3>
                                <p className="text-orange-700 font-bold mb-8 italic">
                                    Daftar pelajar rumah {myHouse.name} untuk menyertai acara sekolah.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="px-8 py-4 bg-orange-200 text-orange-800 text-sm font-black uppercase tracking-widest italic rounded-xl shadow-xl shadow-orange-100 cursor-not-allowed">
                                        ↗ Hubungi Admin untuk Pendaftaran
                                    </span>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                        </div>
                    )}
                </div>

                <div className="bg-slate-100 border-4 border-slate-300 rounded-[2rem] p-8">
                    <h4 className="text-lg font-black italic uppercase tracking-tight text-slate-700 mb-4">Panduan Ringkas</h4>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">1</span>
                            <span><strong>Lihat senarai pelajar</strong> rumah anda untuk maklumat lengkap.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">2</span>
                            <span><strong>Tambah pelajar baharu</strong> yang belum berdaftar.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">3</span>
                            <span><strong>Hubungi admin</strong> untuk pendaftaran acara sekolah.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </CikguLayout>
    );
}
