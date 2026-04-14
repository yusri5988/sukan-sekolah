import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function CikguStudentsIndex({ students, sekolah, myHouse }) {
    const { flash } = usePage().props;

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">
                                Panel Cikgu - Rumah {myHouse?.name || 'Belum dilantik'}
                            </span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Pelajar <span className="text-orange-600">Rumah {myHouse?.name}</span>
                        </h2>
                    </div>
                    {myHouse && (
                        <Link
                            href={route('cikgu.students.create')}
                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 text-center"
                        >
                            + Tambah Pelajar
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Senarai Pelajar" />

            <div className="space-y-8">
                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                <div className="bg-white border-4 border-slate-900 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white font-black italic uppercase tracking-widest text-xs">
                                    <th className="px-8 py-6">Nama</th>
                                    <th className="px-8 py-6">Kelas</th>
                                    <th className="px-8 py-6">Tahun</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-4 divide-slate-50">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-20 text-center">
                                            <div className="text-slate-300 mb-4 text-6xl font-black italic opacity-20 select-none">KOSONG</div>
                                            <p className="text-slate-400 font-bold italic">Tiada pelajar untuk dipaparkan.</p>
                                            {myHouse && (
                                                <Link
                                                    href={route('cikgu.students.create')}
                                                    className="inline-block mt-4 px-6 py-3 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-700 transition-all"
                                                >
                                                    + Tambah Pelajar Pertama
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="font-black italic text-slate-900 uppercase tracking-tighter">
                                                    {student.name}
                                                </div>
                                                <div className="text-xs text-slate-400 font-bold mt-1">
                                                    {student.ic_number}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-slate-500 italic">
                                                {student.class}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest">
                                                    Tahun {student.year}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CikguLayout>
    );
}
