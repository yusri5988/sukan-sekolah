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
                <div className="flex flex-col items-center text-center gap-6">
                    <div>
                        <div className="inline-flex items-center justify-center gap-2 mb-2 w-full">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Athletic Staff</span>
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
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
                        Daftar Guru
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
                        
                        <div className="space-y-4">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Tiada Guru <span className="block text-orange-600">Berdaftar</span>
                            </h4>
                            <p className="text-slate-400 font-bold italic max-w-xs mx-auto text-sm md:text-base leading-snug">
                                Daftarkan akaun guru sukan untuk membantu pengurusan pendaftaran dan keputusan.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="relative bg-white border-2 sm:border-4 border-slate-900 rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:-translate-y-0.5 transition-all duration-300 group"
                            >
                                {/* Role Badge - Top Right */}
                                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                                    <span className="text-[7px] sm:text-[8px] font-black italic text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 shadow-sm">
                                        Cikgu Sukan
                                    </span>
                                </div>

                                {/* Left Section: Identity */}
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black italic text-xl sm:text-2xl shadow-lg shrink-0 rotate-[-2deg] group-hover:rotate-0 transition-transform">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0 space-y-0.5">
                                        <h3 className="font-black italic text-slate-900 uppercase tracking-tighter text-lg sm:text-xl leading-none truncate max-w-[180px] sm:max-w-md group-hover:text-orange-600 transition-colors">
                                            {teacher.name}
                                        </h3>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate italic">
                                            {teacher.email}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Meta & Actions */}
                                <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-8 pt-3 md:pt-0 border-t-2 md:border-t-0 border-slate-50">
                                    {/* Rumah Info */}
                                    <div className="space-y-0.5 md:text-right">
                                        <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Unit Rumah</div>
                                        {teacher.house ? (
                                            <div className="flex items-center md:justify-end gap-2">
                                                <span className="text-xs sm:text-sm font-black text-slate-900 italic uppercase tracking-tighter">{teacher.house.name}</span>
                                                <div
                                                    className="w-3.5 h-3.5 sm:w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm"
                                                    style={{ backgroundColor: teacher.house.color }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-[9px] sm:text-[10px] text-slate-300 font-black italic uppercase tracking-widest">Tiada Rumah</div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleDelete(teacher.id)}
                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all active:scale-90 border-2 border-red-100 shadow-sm group/btn"
                                        title="Padam Akaun"
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
