import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';
import CountdownHero from '@/Components/CountdownHero';

export default function AdminSekolahDashboard({ stats, houses, sekolah }) {
    const menuItems = [
        { 
            group: 'Pendaftaran',
            items: [
                { label: 'Rumah Sukan', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', href: route('admin-sekolah.houses.index'), color: 'orange' },
                { label: 'Senarai Guru', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', href: route('admin-sekolah.teachers.index'), color: 'blue' },
                { label: 'Lantikan Guru', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', href: route('admin-sekolah.teachers.assignments.index'), color: 'emerald' },
                { label: 'Data Pelajar', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', href: route('admin-sekolah.students.index'), color: 'indigo' },
            ]
        },
        {
            group: 'Pengurusan',
            items: [
                { label: 'Kejohanan', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', href: route('admin-sekolah.meets.index'), color: 'rose' },
                { label: 'Urus Acara', icon: 'M13 10V3L4 14h7v7l9-11h-7z', href: route('admin-sekolah.events.index'), color: 'amber' },
                { label: 'Pemarkahan', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', href: route('admin-sekolah.scoring.index'), color: 'violet' },
            ]
        }
    ];

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Dashboard</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        {sekolah.nama}
                    </h2>
                </div>
            }
        >
            <Head title={`Dashboard | ${sekolah.nama}`} />

            <div className="space-y-12 pb-12">
                {/* Dashboard Hero Countdown */}
                <CountdownHero meet={sekolah.meet} />

                {/* Main Menu Grid - Smaller & 3D */}
                <div className="space-y-10">
                    {menuItems.map((group, idx) => (
                        <div key={idx} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">{group.group}</h3>
                                <div className="h-px bg-slate-200 flex-1" />
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {group.items.map((item, i) => (
                                    <Link 
                                        key={i} 
                                        href={item.href}
                                        className="group bg-white border-2 border-slate-100 border-b-[8px] border-b-slate-200 p-5 md:p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-slate-200 active:translate-y-1 active:border-b-[2px] transition-all duration-200 flex flex-col items-center text-center gap-4"
                                    >
                                        <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[1.75rem] flex items-center justify-center bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
                                            <svg className="w-7 h-7 md:w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic text-slate-800 leading-tight">
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Statistik Semasa</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { 
                                label: 'Jumlah Pelajar', 
                                value: stats.total_students, 
                                icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                                color: 'blue',
                                bg: 'bg-blue-50',
                                text: 'text-blue-600'
                            },
                            { 
                                label: 'Rumah Sukan', 
                                value: stats.total_houses, 
                                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                                color: 'orange',
                                bg: 'bg-orange-50',
                                text: 'text-orange-600'
                            },
                            { 
                                label: 'Belum Ada Rumah', 
                                value: stats.students_without_house, 
                                icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
                                color: 'red',
                                bg: 'bg-red-50',
                                text: 'text-red-600'
                            }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm group relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 ${stat.bg} opacity-50 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150`} />
                                
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                            {stat.label}
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 tabular-nums">
                                            {stat.value}
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.text} shadow-sm border border-white`}>
                                        <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ranking Section */}
                <div className="space-y-6 pb-20">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Kedudukan Terkini</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <div className="relative z-10">
                            <div className="px-6 py-6 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-8 bg-orange-600 rounded-full" />
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white">Ranking Rumah Sukan</h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Mata keseluruhan terkumpul</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4 md:p-10">
                                {houses.length === 0 ? (
                                    <div className="text-center py-12 bg-white/5 rounded-[2rem] border border-white/5 border-dashed">
                                        <p className="text-slate-400 font-bold mb-8 italic text-lg">Belum ada data rumah sukan.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-3 md:gap-4">
                                        {houses.map((house, index) => (
                                            <div key={house.id} className="relative group">
                                                <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all">
                                                    <div className="flex items-center gap-4 md:gap-6">
                                                        <div 
                                                           className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl text-xl md:text-2xl font-black italic tracking-tighter tabular-nums"
                                                           style={{ 
                                                               backgroundColor: house.color,
                                                               color: ['#f8fafc', '#eab308'].includes(house.color) ? '#0f172a' : '#ffffff'
                                                           }}
                                                        >
                                                            {index + 1}
                                                        </div>                                                        <div>
                                                            <div className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white">
                                                                {house.name}
                                                            </div>
                                                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                                                                {house.students_count} Atlet
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                                                            {house.points}
                                                        </div>
                                                        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-600 mt-1">Mata</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
