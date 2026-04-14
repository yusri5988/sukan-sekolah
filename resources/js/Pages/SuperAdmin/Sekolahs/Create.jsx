import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function SekolahsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        alamat: '',
        telefon: '',
        email: '',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newSchoolData, setNewSchoolData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('super-admin.sekolahs.store'), {
            onSuccess: (page) => {
                if (page.props.flash?.new_sekolah) {
                    setNewSchoolData(page.props.flash.new_sekolah);
                    setShowSuccessModal(true);
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <div className="inline-flex items-center gap-2 mb-1 sm:mb-2">
                        <div className="w-6 sm:w-8 h-[2px] bg-orange-600" />
                        <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Pendaftaran</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Tambah <span className="text-orange-600">Sekolah Baru</span>
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Sekolah Baru" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 sm:mb-6">
                                        Maklumat Sekolah
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 gap-5 sm:gap-8">
                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                Nama Sekolah <span className="text-orange-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama}
                                                onChange={(e) => setData('nama', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                                placeholder="SJK(C) CHUNG HWA"
                                            />
                                            {errors.nama && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.nama}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                Alamat Lengkap
                                            </label>
                                            <textarea
                                                value={data.alamat}
                                                onChange={(e) => setData('alamat', e.target.value)}
                                                rows="3"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                                placeholder="ALAMAT LENGKAP SEKOLAH"
                                            />
                                            {errors.alamat && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.alamat}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:gap-8 sm:grid-cols-2">
                                            <div className="space-y-1 sm:space-y-2">
                                                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                    No. Telefon
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.telefon}
                                                    onChange={(e) => setData('telefon', e.target.value)}
                                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                                    placeholder="03-12345678"
                                                />
                                                {errors.telefon && (
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.telefon}</p>
                                                )}
                                            </div>

                                            <div className="space-y-1 sm:space-y-2">
                                                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                    Emel Sekolah
                                                </label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                                    placeholder="SEKOLAH@EDU.MY"
                                                />
                                                {errors.email && (
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6 bg-slate-900 rounded-2xl sm:rounded-3xl border-4 border-orange-600">
                                        <div className="flex gap-3 sm:gap-4">
                                            <div className="flex-shrink-0 text-orange-500">
                                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white italic mb-1">Nota Penting</h4>
                                                <p className="text-[10px] sm:text-sm font-bold text-slate-400 italic leading-snug">
                                                    Sistem akan menjana akaun Admin Sekolah secara automatik menggunakan emel yang disediakan.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 pt-6 sm:pt-10 border-t-4 border-slate-50">
                                    <Link
                                        href={route('super-admin.sekolahs.index')}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-slate-900 hover:bg-slate-50 transition-all active:scale-95 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-orange-600 text-white border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        {processing ? 'MEMPROSES...' : 'CIPTA SEKOLAH →'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showSuccessModal && newSchoolData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm">
                    <div className="w-full max-w-xl bg-white border-4 sm:border-8 border-slate-900 shadow-[10px_10px_0px_0px_rgba(234,88,12,1)] sm:shadow-[20px_20px_0px_0px_rgba(234,88,12,1)] rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
                        <div className="p-6 sm:p-12 text-center">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-emerald-100 border-4 border-slate-900 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                                <svg className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-3 sm:mb-4 leading-none">
                                Sekolah Berjaya<br/><span className="text-emerald-600">Didaftarkan!</span>
                            </h3>
                            
                            <div className="my-6 sm:my-10 p-5 sm:p-8 bg-slate-50 border-4 border-slate-900 rounded-2xl sm:rounded-3xl relative overflow-hidden text-left">
                                <div className="absolute right-0 top-0 text-5xl sm:text-[6rem] font-black italic uppercase text-slate-100 leading-none pointer-events-none -z-0 translate-x-1/4 -translate-y-1/4">
                                    KEY
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 italic mb-3 sm:mb-4">Kredential Admin Sekolah</h4>
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Emel Log Masuk</div>
                                            <div className="text-base sm:text-xl font-black italic uppercase text-slate-900 break-all">{newSchoolData.admin_sekolah.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kata Laluan Sementara</div>
                                            <div className="text-2xl sm:text-3xl font-black text-orange-600 tabular-nums tracking-widest">{newSchoolData.generated_password}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-[10px] sm:text-sm font-bold text-slate-500 italic mb-8 sm:mb-10">
                                Sila berikan kredential di atas kepada Admin Sekolah tersebut.
                            </p>
                            
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    window.location.href = route('super-admin.sekolahs.index');
                                }}
                                className="w-full px-6 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white text-base sm:text-xl font-black uppercase tracking-widest italic rounded-xl sm:rounded-2xl hover:bg-orange-600 transition-all active:scale-95"
                            >
                                SELESAI & KEMBALI
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
