import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function HousesShow({ house, students }) {
    const [navigating, setNavigating] = useState(false);

    useEffect(() => {
        const cleanup = router.on('finish', () => setNavigating(false));
        return () => cleanup();
    }, []);

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Team Details</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        {house.name}
                    </h2>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={house.name} />

            <div className="space-y-12 pb-24">
                {/* Stats Grid */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Prestasi & Kapasiti</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="grid grid-cols-1">
                        {[
                            { 
                                label: 'Jumlah Atlet', 
                                value: house.students_count, 
                                unit: 'ATLET',
                                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                                color: 'blue',
                                bg: 'bg-blue-50',
                                text: 'text-blue-600'
                            }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm group relative overflow-hidden">
                                <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 ${stat.bg} opacity-50 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150`} />
                                
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                            {stat.label}
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 tabular-nums flex items-baseline gap-2">
                                            {stat.value}
                                            <span className="text-xs md:text-sm text-slate-300 uppercase not-italic font-bold tracking-widest">{stat.unit}</span>
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

                {/* Teachers Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Guru Penjaga</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    
                    {house.teachers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {house.teachers.map((teacher) => (
                                <div key={teacher.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-[1.5rem] group transition-all hover:shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg font-black italic shadow-lg shrink-0">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-900 truncate">{teacher.name}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{teacher.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 bg-white border border-slate-100 border-dashed rounded-[2rem] text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Tiada guru dilantik untuk rumah sukan ini.</p>
                        </div>
                    )}
                </div>

                {/* Students Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Senarai Pelajar</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                                <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">Rekod Pelajar</h3>
                            </div>
                            <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {students.total} Pelajar Terdaftar
                            </div>
                        </div>

                        {students.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Bil</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Nama Pelajar</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Kelas</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-right">Jantina</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {students.data.map((student, index) => (
                                            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-6 text-sm font-black italic text-slate-300 group-hover:text-slate-900 tabular-nums">
                                                    {((students.current_page - 1) * students.per_page + index + 1).toString().padStart(2, '0')}
                                                </td>
                                                <td className="px-8 py-6 text-base font-black italic uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                                                    {student.name}
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest italic">{student.class}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest italic ${
                                                        student.gender === 'male' 
                                                            ? 'bg-blue-50 text-blue-600' 
                                                            : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                        {student.gender === 'male' ? 'Lelaki' : 'Perempuan'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Tiada pelajar dalam rumah sukan ini.</p>
                            </div>
                        )}

                        {students.last_page > 1 && (
                            <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex flex-wrap gap-2 justify-center">
                                {students.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || ''}
                                        preserveScroll
                                        onClick={() => setNavigating(true)}
                                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${
                                            link.active
                                                ? 'bg-slate-900 text-white shadow-lg'
                                                : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900'
                                        } ${!link.url ? 'pointer-events-none opacity-40' : ''} ${navigating && !link.active ? 'opacity-50 pointer-events-none' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
