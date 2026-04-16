import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';

export default function TeachersIndex({ teachers }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Adakah anda pasti ingin memadam akaun guru ini?')) {
            destroy(route('admin-sekolah.teachers.destroy', id));
        }
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.4em]">Kakitangan Sukan</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Senarai <span className="text-orange-600">Guru</span>
                        </h2>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <Link
                            href={route('admin-sekolah.teachers.create')}
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none"
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                            </svg>
                            Daftar Guru Baharu
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Senarai Guru" />

            <div className="space-y-6">
                {(flash?.success || flash?.error) && (
                    <div className={`p-4 rounded-xl border-l-[8px] transition-all duration-500 shadow-sm ${
                        flash?.success 
                            ? 'bg-emerald-50 border-emerald-500' 
                            : 'bg-red-50 border-red-500'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className="shrink-0">
                                {flash?.success ? (
                                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                )}
                            </div>
                            <div>
                                <div className={`text-[9px] font-black uppercase tracking-widest ${flash?.success ? 'text-emerald-600' : 'text-red-600'} mb-0.5`}>Status Sistem</div>
                                <div className={`text-xs font-bold ${flash?.success ? 'text-emerald-900' : 'text-red-900'} italic`}>{flash?.success || flash?.error}</div>
                            </div>
                        </div>
                    </div>
                )}

                {teachers.length === 0 ? (
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center flex flex-col items-center">
                        <div className="text-slate-200 text-6xl md:text-9xl font-black italic mb-2 md:mb-4 select-none drop-shadow-sm">EMPTY</div>
                        <p className="text-lg md:text-2xl font-black italic text-slate-400 uppercase tracking-tight mb-6">Tiada guru berdaftar.</p>
                        <Link 
                            href={route('admin-sekolah.teachers.create')} 
                            className="inline-block w-full sm:w-auto px-8 py-4 bg-orange-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none"
                        >
                            Tambah Sekarang &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="group relative bg-white border-2 border-slate-900 rounded-[1.5rem] md:rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden transition-all hover:-translate-y-1"
                            >
                                {/* Card Body - Integrated View */}
                                <div className="p-5 md:p-6">
                                    <div className="flex items-start justify-between mb-5 md:mb-6">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black italic text-2xl md:text-3xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 shrink-0">
                                            {teacher.name.charAt(0)}
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pangkat</div>
                                            <div className="text-[10px] font-black italic text-slate-900 uppercase bg-slate-100 px-2 py-1 rounded-md border border-slate-200 mt-1">Cikgu Sukan</div>
                                        </div>
                                    </div>

                                    <h3 className="font-black italic text-slate-900 uppercase tracking-tighter text-xl md:text-2xl leading-none mb-5 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {teacher.name}
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Rumah Sukan - High Contrast */}
                                        <div className="p-3 md:p-4 bg-slate-900 rounded-xl flex items-center justify-between">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-white/50 italic">Rumah</div>
                                            {teacher.house ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-white italic uppercase tracking-tight truncate max-w-[100px] sm:max-w-[120px]">{teacher.house.name}</span>
                                                    <div
                                                        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                                                        style={{ backgroundColor: teacher.house.color }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-[9px] text-white/30 font-black italic uppercase">Tiada</span>
                                            )}
                                        </div>

                                        {/* Emel & Info */}
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Hubungan</div>
                                                <div className="font-bold text-slate-900 italic text-xs truncate bg-slate-50 border border-slate-100 p-2.5 rounded-lg uppercase tracking-tight border-dashed">
                                                    {teacher.email}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center border-t border-slate-100 pt-3 md:pt-4">
                                                <div>
                                                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic mb-0.5">Sertai Pada</div>
                                                    <div className="font-black italic text-slate-900 text-sm">
                                                        {new Date(teacher.created_at).toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
                                                    className="w-9 h-9 md:w-10 md:h-10 bg-red-50 text-red-600 border-2 border-red-100 rounded-lg flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(220,38,38,1)] hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-y-[2px] active:shadow-none"
                                                    title="Padam Akaun"
                                                >
                                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
