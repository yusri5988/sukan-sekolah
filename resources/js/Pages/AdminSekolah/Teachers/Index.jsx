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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Athletic Staff</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Guru</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.teachers.create')}
                        className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                        Daftar Guru Baharu
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Guru" />

            <div className="space-y-8 md:space-y-12">
                {(flash?.success || flash?.error) && (
                    <div className={`flex items-center gap-4 p-6 border rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
                        flash?.success 
                            ? 'bg-emerald-50 border-emerald-100' 
                            : 'bg-red-50 border-red-100'
                    }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
                            flash?.success ? 'bg-emerald-500' : 'bg-red-500'
                        }`}>
                            {flash?.success ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </div>
                        <div>
                            <div className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                                flash?.success ? 'text-emerald-600' : 'text-red-600'
                            }`}>Sistem</div>
                            <p className={`text-sm font-bold italic ${
                                flash?.success ? 'text-emerald-900' : 'text-red-900'
                            }`}>{flash?.success || flash?.error}</p>
                        </div>
                    </div>
                )}

                {teachers.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
                             <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        
                        <div className="space-y-4 mb-10">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Tiada Guru <span className="block text-orange-600">Berdaftar</span>
                            </h4>
                            <p className="text-slate-400 font-bold italic max-w-xs mx-auto text-sm md:text-base leading-snug">
                                Daftarkan akaun guru sukan untuk membantu pengurusan pendaftaran dan keputusan.
                            </p>
                        </div>

                        <Link
                            href={route('admin-sekolah.teachers.create')}
                            className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl border-b-[6px] border-slate-950 shadow-xl active:translate-y-1 active:border-b-[2px] transition-all"
                        >
                            Daftar Guru Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="group bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black italic text-2xl md:text-3xl shadow-inner border border-orange-100">
                                            {teacher.name.charAt(0)}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</div>
                                            <span className="text-[10px] font-black italic text-slate-900 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                                                Cikgu Sukan
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="font-black italic text-slate-900 uppercase tracking-tighter text-xl md:text-2xl leading-none mb-6 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {teacher.name}
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Rumah Sukan */}
                                        <div className="p-4 bg-slate-900 rounded-[1.5rem] flex items-center justify-between shadow-lg shadow-slate-900/10">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-white/50 italic">Rumah</div>
                                            {teacher.house ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-white italic uppercase tracking-tight truncate max-w-[120px]">{teacher.house.name}</span>
                                                    <div
                                                        className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                                                        style={{ backgroundColor: teacher.house.color }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-[9px] text-white/30 font-black italic uppercase">Belum Assign</span>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 italic">Emel Rasmi</div>
                                                <div className="font-bold text-slate-900 italic text-xs truncate bg-slate-50 border border-slate-100 p-3 rounded-xl uppercase tracking-tight">
                                                    {teacher.email}
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                                <div>
                                                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic mb-0.5">Didaftar</div>
                                                    <div className="font-black italic text-slate-900 text-sm">
                                                        {new Date(teacher.created_at).toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
                                                    className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all active:scale-90 border border-red-100 shadow-sm"
                                                    title="Padam Akaun"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
