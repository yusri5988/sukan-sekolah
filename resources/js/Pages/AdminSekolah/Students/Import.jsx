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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.3em]">Import Batch</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Import <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <div className="px-5 py-3 bg-slate-900 text-white rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 w-full md:w-auto flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                            <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60">Format Diperlukan</div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs md:text-sm font-black uppercase tracking-widest italic drop-shadow-sm">Fail CSV</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Import Pelajar" />

            <div className="space-y-6 md:space-y-12">
                <div className="bg-white border-2 md:border-4 border-slate-900 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-start md:items-center gap-4 mb-6 md:mb-8">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-orange-600 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900">
                                <svg className="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900">Muat Naik Fail CSV</h3>
                                <p className="text-[11px] md:text-xs text-slate-500 font-bold italic mt-0.5">
                                    Pilih fail CSV untuk import pelajar secara kelompok (batch).
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                            <div className="space-y-4">
                                <div className="border-2 md:border-4 border-dashed border-slate-300 rounded-2xl p-8 md:p-12 text-center hover:border-orange-600 hover:bg-orange-50/50 transition-all group/dropzone">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block">
                                        <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200 group-hover/dropzone:border-orange-200 group-hover/dropzone:bg-orange-100 transition-colors">
                                            <svg className="h-6 w-6 md:h-8 md:w-8 text-slate-400 group-hover/dropzone:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        {data.file ? (
                                            <div>
                                                <p className="text-sm md:text-lg font-black text-slate-900 truncate px-4">{data.file.name}</p>
                                                <p className="text-[10px] md:text-sm font-bold text-emerald-600 mt-1 uppercase tracking-widest">{(data.file.size / 1024).toFixed(1)} KB Sedia Untuk Dimuat Naik</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm md:text-lg font-black text-slate-900">Tekan di sini untuk pilih fail</p>
                                                <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest max-w-[200px] mx-auto">Sokongan format .csv sahaja.</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && (
                                    <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-center">
                                         <p className="text-[10px] md:text-xs font-black uppercase text-red-600 tracking-widest">{errors.file}</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 border-2 md:border-4 border-slate-900 p-5 md:p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)]">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-900">
                                        <svg className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Keperluan Format Lajur</h4>
                                        <code className="block text-[10px] md:text-xs text-slate-800 bg-white p-2.5 rounded-lg border-2 border-slate-200 mb-3 overflow-x-auto whitespace-nowrap shadow-inner">
                                            name, ic_number, class, year, gender
                                        </code>
                                        <div className="text-[9px] md:text-[10px] font-bold text-slate-500 space-y-1.5 uppercase tracking-widest italic">
                                            <p className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0"/> Lajur ini wajib ada</p>
                                            <p className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0"/> Pelajar sedia ada akan dinaik taraf</p>
                                            <p className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0"/> Pelajar baru akan ditambah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border-2 border-orange-600/30 p-5 md:p-6 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-orange-700">
                                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-orange-900 mb-1">Tip Pantas</h4>
                                        <p className="text-[10px] md:text-xs font-bold text-orange-800 italic mb-3">
                                            Tengok contoh data yang sah di sini.
                                        </p>
                                        <a
                                            href={route('admin-sekolah.students.import.template')}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-700 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px] active:shadow-none"
                                        >
                                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Template
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row-reverse items-stretch justify-start gap-3 pt-4 border-t-2 border-slate-100">
                                <button
                                    type="submit"
                                    disabled={processing || !data.file}
                                    className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-emerald-600 text-white text-[11px] md:text-[12px] font-black uppercase tracking-widest italic rounded-xl hover:bg-emerald-700 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:shadow-none disabled:active:translate-y-0 text-center"
                                >
                                    {processing ? 'Memproses...' : 'Mula Import'}
                                </button>
                                <Link
                                    href={route('admin-sekolah.students.index')}
                                    className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white border-2 border-slate-900 text-slate-900 text-[11px] md:text-[12px] font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none text-center"
                                >
                                    Kembali
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
