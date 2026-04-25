import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function StudentsImport() {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.students.process-import'), {
            forceFormData: true,
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Batch Registration</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Import <span className="text-orange-600">Pelajar</span>
                    </h2>
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title="Import Pelajar" />

            <div className="space-y-12 pb-24">
                {/* Upload Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Muat Naik Data</h3>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Dropzone */}
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 md:p-16 text-center hover:border-orange-600 hover:bg-orange-50/30 transition-all group/dropzone relative overflow-hidden">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block relative z-10">
                                        <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                                            data.file 
                                                ? 'bg-emerald-50 border-emerald-100 text-emerald-500' 
                                                : 'bg-slate-50 border-slate-100 text-slate-300 group-hover/dropzone:bg-orange-100 group-hover/dropzone:border-orange-200 group-hover/dropzone:text-orange-500'
                                        }`}>
                                            <svg className="h-8 w-8 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {data.file ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                )}
                                            </svg>
                                        </div>
                                        {data.file ? (
                                            <div className="space-y-2">
                                                <p className="text-lg md:text-xl font-black text-slate-900 truncate px-4">{data.file.name}</p>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest italic">
                                                    {(data.file.size / 1024).toFixed(1)} KB • Ready
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight italic">Pilih Fail CSV</p>
                                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Seret fail ke sini atau klik untuk cari</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && (
                                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center animate-shake">
                                         <p className="text-[10px] font-black uppercase text-red-600 tracking-widest italic">{errors.file}</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Format Requirements */}
                                <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Format Header Fail</h4>
                                    </div>
                                    <code className="block text-[11px] text-slate-800 bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto whitespace-nowrap shadow-inner font-mono">
                                        name, ic_number, class, year, gender
                                    </code>
                                    <div className="space-y-2">
                                        {[
                                            'Lajur header wajib disertakan',
                                            'Gunakan format gender: male / female',
                                            'IC digunakan sebagai ID unik pelajar'
                                        ].map((tip, i) => (
                                            <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                                                {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Template */}
                                <div className="bg-orange-50 p-6 md:p-8 rounded-[2rem] border border-orange-100 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-900">Template Contoh</h4>
                                    </div>
                                    <p className="text-[10px] font-bold text-orange-800 italic leading-snug uppercase tracking-widest opacity-80">
                                        Muat turun template fail CSV yang sudah diformat dengan betul untuk memudahkan proses.
                                    </p>
                                    <a
                                        href={route('admin-sekolah.students.import.template')}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                    >
                                        Download Template .CSV
                                    </a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || !data.file}
                                className="w-full py-5 md:py-6 bg-emerald-500 text-white text-xs md:text-sm font-black uppercase tracking-[0.3em] italic rounded-3xl shadow-lg hover:bg-emerald-600 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Memproses Data...
                                    </span>
                                ) : 'Sahkan & Mula Import →'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
