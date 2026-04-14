import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SekolahsCreate({ referencesByState }) {
    const { data, setData, post, processing, errors } = useForm({
        negeri: '',
        school_reference_id: '',
        telefon: '',
    });

    const stateNames = Object.keys(referencesByState || {});
    const schools = data.negeri ? referencesByState?.[data.negeri] || [] : [];
    const selectedSchool = schools.find((school) => String(school.id) === String(data.school_reference_id));

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('super-admin.sekolahs.store'));
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
                        Pilih <span className="text-orange-600">Sekolah</span>
                    </h2>
                </div>
            }
        >
            <Head title="Pilih Sekolah" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 sm:mb-6">
                                        Daftar Sekolah Dari Katalog Seed
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 gap-5 sm:gap-8">
                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                Negeri <span className="text-orange-600">*</span>
                                            </label>
                                            <select
                                                value={data.negeri}
                                                onChange={(e) => {
                                                    setData('negeri', e.target.value);
                                                    setData('school_reference_id', '');
                                                }}
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            >
                                                <option value="">Pilih negeri</option>
                                                {stateNames.map((negeri) => (
                                                    <option key={negeri} value={negeri}>
                                                        {negeri}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.negeri && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.negeri}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                Sekolah <span className="text-orange-600">*</span>
                                            </label>
                                            <select
                                                value={data.school_reference_id}
                                                disabled={!data.negeri}
                                                onChange={(e) => setData('school_reference_id', e.target.value)}
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            >
                                                <option value="">{data.negeri ? 'Pilih sekolah' : 'Pilih negeri dahulu'}</option>
                                                {schools.map((school) => (
                                                    <option key={school.id} value={school.id}>
                                                        {school.nama}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.school_reference_id && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.school_reference_id}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1 sm:space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                                Nombor Telefon <span className="text-orange-600">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.telefon}
                                                onChange={(e) => setData('telefon', e.target.value)}
                                                placeholder="011-12345678"
                                                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            />
                                            {errors.telefon && (
                                                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.telefon}</p>
                                            )}
                                        </div>

                                        <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border-4 border-slate-900">
                                            <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-900 italic mb-3">Ringkasan Pilihan</h4>
                                            {selectedSchool ? (
                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Negeri</div>
                                                        <div className="text-sm sm:text-base font-black italic uppercase text-slate-900">{data.negeri}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nama Sekolah</div>
                                                        <div className="text-sm sm:text-base font-black italic uppercase text-slate-900">{selectedSchool.nama}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] sm:text-sm font-bold text-slate-500 italic">
                                                    Pilih negeri dan sekolah dari katalog seed untuk terus daftar ke dalam sistem.
                                                </p>
                                            )}
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
                                                    Selepas sekolah dipilih dan didaftarkan, sekolah itu akan terus hilang dari senarai pilihan untuk elak pendaftaran berganda.
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
                                        {processing ? 'MEMPROSES...' : 'DAFTAR SEKOLAH →'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
