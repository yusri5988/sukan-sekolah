import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminSekolahDashboard({ stats, houses, sekolah }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Official Dashboard</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {sekolah.nama}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Status Sistem</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest">Live & Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Dashboard | ${sekolah.nama}`} />

            <div className="space-y-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { 
                            label: 'Jumlah Pelajar', 
                            value: stats.total_students, 
                            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                            color: 'blue' 
                        },
                        { 
                            label: 'Rumah Sukan', 
                            value: stats.total_houses, 
                            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                            color: 'orange' 
                        },
                        { 
                            label: 'Belum Ada Rumah', 
                            value: stats.students_without_house, 
                            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
                            color: 'red' 
                        }
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
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-900 text-white transform group-hover:rotate-12 transition-transform shadow-xl`}>
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ranking Section */}
                <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden uppercase font-black text-[10vw] leading-none text-white flex flex-col gap-0 items-center justify-center rotate-[-10deg]">
                        <div>Leaderboard</div>
                    </div>

                    <div className="relative z-10">
                        <div className="px-10 py-8 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Ranking Rumah Sukan</h3>
                            </div>
                            <Link
                                href={route('admin-sekolah.houses.index')}
                                className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors"
                            >
                                Urus Rumah →
                            </Link>
                        </div>
                        
                        <div className="p-10">
                            {houses.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-slate-400 font-bold mb-6 italic text-xl">
                                        Belum ada data rumah sukan untuk dipaparkan.
                                    </p>
                                    <Link 
                                        href={route('admin-sekolah.houses.create')} 
                                        className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-white hover:text-slate-900 transition-all active:scale-95 inline-block"
                                    >
                                        Cipta Rumah Pertama
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {houses.map((house, index) => (
                                        <div key={house.id} className="relative group">
                                            <div className="bg-white/5 border-2 border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors hover:border-orange-600/50">
                                                <div className="flex items-center gap-6">
                                                    <div className={`text-4xl font-black italic tracking-tighter tabular-nums ${
                                                        index === 0 ? 'text-yellow-400' :
                                                        index === 1 ? 'text-slate-300' :
                                                        index === 2 ? 'text-orange-400' :
                                                        'text-slate-500'
                                                    }`}>
                                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-orange-500 transition-colors">
                                                            {house.name}
                                                        </div>
                                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                                            {house.students_count} Atet Aktif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform tabular-nums">
                                                        {house.points}
                                                    </div>
                                                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">Mata Terkumpul</div>
                                                </div>
                                            </div>
                                            {/* Progress Bar Background */}
                                            <div className="absolute bottom-0 left-6 right-6 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full bg-orange-600 transition-all duration-1000 delay-300`} 
                                                    style={{ width: `${(house.points / (houses[0].points || 1)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 leading-none">Pengurusan Rumah</h3>
                            <p className="text-slate-500 font-bold mb-8 italic">
                                Cipta dan uruskan rumah sukan untuk sekolah anda. Assign pelajar ke rumah masing-masing.
                            </p>
                            <Link
                                href={route('admin-sekolah.houses.index')}
                                className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 inline-block shadow-xl shadow-slate-200"
                            >
                                Urus Rumah Sukan
                            </Link>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                    </div>

                    <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 leading-none">Pengurusan Pelajar</h3>
                            <p className="text-slate-500 font-bold mb-8 italic">
                                Tambah pelajar secara manual atau import dari fail CSV. Assign pelajar ke rumah sukan.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('admin-sekolah.students.create')}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100"
                                >
                                    + Tambah Pelajar
                                </Link>
                                <Link
                                    href={route('admin-sekolah.students.import')}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Import CSV
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
