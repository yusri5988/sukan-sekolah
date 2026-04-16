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
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-1.5 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-xs font-black uppercase tracking-[0.4em]">Kakitangan Sukan</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                        Senarai <span className="text-orange-600 block sm:inline">Guru</span>
                    </h2>
                    <div className="mt-4">
                        <Link
                            href={route('admin-sekolah.teachers.create')}
                            className="inline-flex items-center gap-3 px-8 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-2xl hover:bg-orange-600 transition-all active:scale-95 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.3)]"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                            </svg>
                            Daftar Guru Baharu
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Senarai Guru" />

            <div className="space-y-10">
                {(flash?.success || flash?.error) && (
                    <div className={`p-5 rounded-2xl border-l-[12px] transition-all duration-500 ${
                        flash?.success 
                            ? 'bg-emerald-900 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                            : 'bg-red-900 border-red-500 text-white shadow-xl shadow-red-500/20'
                    }`}>
                        <div className="flex items-center gap-4">
                            <div className="shrink-0">
                                {flash?.success ? (
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                )}
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Status Sistem</div>
                                <div className="text-lg font-black italic leading-none">{flash?.success || flash?.error}</div>
                            </div>
                        </div>
                    </div>
                )}

                {teachers.length === 0 ? (
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
                        <div className="text-slate-200 text-9xl font-black italic mb-4">EMPTY</div>
                        <p className="text-2xl font-black italic text-slate-400 uppercase tracking-tight">Tiada guru berdaftar.</p>
                        <Link href={route('admin-sekolah.teachers.create')} className="text-orange-600 font-black italic uppercase tracking-widest text-sm mt-4 inline-block hover:underline">Tambah Sekarang &rarr;</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="group relative bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(234,88,12,1)]"
                            >
                                {/* Card Body - Integrated View */}
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-20 h-20 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-black italic text-4xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900">
                                            {teacher.name.charAt(0)}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pangkat</div>
                                            <div className="text-xs font-black italic text-slate-900 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mt-1 inline-block">Cikgu Sukan</div>
                                        </div>
                                    </div>

                                    <h3 className="font-black italic text-slate-900 uppercase tracking-tighter text-3xl leading-none mb-6 group-hover:text-orange-600 transition-colors">
                                        {teacher.name}
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Rumah Sukan - High Contrast */}
                                        <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/50 italic">Rumah Sukan</div>
                                            {teacher.house ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-white italic uppercase tracking-tight">{teacher.house.name}</span>
                                                    <div
                                                        className="w-4 h-4 rounded-full border-2 border-white/20"
                                                        style={{ backgroundColor: teacher.house.color }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-white/30 font-black italic uppercase">Tiada</span>
                                            )}
                                        </div>

                                        {/* Emel & Info */}
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 italic">Hubungan</div>
                                                <div className="font-bold text-slate-900 italic text-sm truncate bg-slate-50 border border-slate-100 p-3 rounded-xl uppercase tracking-tighter">
                                                    {teacher.email}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Sertai Pada</div>
                                                    <div className="font-black italic text-slate-900 text-lg">
                                                        {new Date(teacher.created_at).toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(teacher.id)}
                                                    className="p-3 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all tooltip"
                                                    title="Padam Akaun"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
