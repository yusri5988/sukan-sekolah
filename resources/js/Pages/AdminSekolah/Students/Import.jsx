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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Import Batch</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Import Pelajar
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Format</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-black uppercase tracking-widest">CSV</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Import Pelajar" />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Muat Naik Fail CSV</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Pilih fail CSV untuk import pelajar secara batch.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <div className="border-4 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-orange-600 transition-colors">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                                            <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        {data.file ? (
                                            <div>
                                                <p className="text-lg font-black text-slate-900">{data.file.name}</p>
                                                <p className="text-sm font-bold text-emerald-600 mt-1">{(data.file.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-lg font-black text-slate-900">Drop fail CSV di sini</p>
                                                <p className="text-sm font-bold text-slate-500 mt-1">atau klik untuk pilih fail</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.file && (
                                    <p className="text-sm font-bold text-red-600 italic">{errors.file}</p>
                                )}
                            </div>

                            <div className="bg-slate-50 border-4 border-slate-900 p-6 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">Format CSV yang diperlukan</h4>
                                        <code className="block text-xs text-slate-700 bg-white p-3 rounded-xl border-2 border-slate-200 mb-3">
                                            name, ic_number, class, year, gender
                                        </code>
                                        <div className="text-xs font-bold text-slate-600 space-y-1">
                                            <p><span className="text-orange-600">*</span> Header mestilah ada dalam fail</p>
                                            <p><span className="text-orange-600">*</span> No. KP yang wujud akan dikemaskini</p>
                                            <p><span className="text-orange-600">*</span> No. KP baru akan dicipta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border-4 border-orange-600/30 p-6 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-orange-900 mb-1">Tip</h4>
                                        <p className="text-sm font-bold text-orange-800 italic mb-3">
                                            Muat turun template CSV sebagai contoh format yang diperlukan.
                                        </p>
                                        <a
                                            href={route('admin-sekolah.students.import.template')}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-700 transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Template CSV
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-8 border-t-4 border-slate-100">
                                <Link
                                    href={route('admin-sekolah.students.index')}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !data.file}
                                    className="px-8 py-4 bg-emerald-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Memproses...' : 'Import Pelajar'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
