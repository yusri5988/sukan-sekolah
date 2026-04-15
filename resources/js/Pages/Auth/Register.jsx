import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Register({ referencesByState = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        negeri: '',
        school_reference_id: '',
        telefon: '',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newSchoolData, setNewSchoolData] = useState(null);
    const [showStatePicker, setShowStatePicker] = useState(false);
    const [showSchoolPicker, setShowSchoolPicker] = useState(false);
    const [stateSearch, setStateSearch] = useState('');
    const [schoolSearch, setSchoolSearch] = useState('');

    const stateNames = Object.keys(referencesByState || {});
    const schools = data.negeri ? referencesByState?.[data.negeri] || [] : [];
    const selectedSchool = schools.find((school) => String(school.id) === String(data.school_reference_id));
    const filteredStates = stateNames.filter((negeri) =>
        negeri.toLowerCase().includes(stateSearch.toLowerCase())
    );
    const filteredSchools = schools.filter((school) =>
        school.nama.toLowerCase().includes(schoolSearch.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: (page) => {
                if (page.props.flash?.new_sekolah) {
                    setNewSchoolData(page.props.flash.new_sekolah);
                    setShowSuccessModal(true);
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Sekolah" />

            <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                    Daftar <span className="text-orange-600">Sekolah</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    Pilih negeri dan sekolah dari katalog seed
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic block">
                        Nama Cikgu <span className="text-orange-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                        placeholder="Ct: Ahmad bin Ali"
                        className="mt-2 w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 bg-white"
                    />
                    {errors.nama && <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic mt-2">{errors.nama}</p>}
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic block">
                        Nombor Telefon <span className="text-orange-600">*</span>
                    </label>
                    <input
                        type="tel"
                        value={data.telefon}
                        onChange={(e) => setData('telefon', e.target.value)}
                        placeholder="011-12345678"
                        className="mt-2 w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 bg-white"
                    />
                    {errors.telefon && <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic mt-2">{errors.telefon}</p>}
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic block">
                        Negeri <span className="text-orange-600">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowStatePicker(true)}
                        className="mt-2 w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 bg-white text-left flex items-center justify-between"
                    >
                        <span>{data.negeri || 'Pilih negeri'}</span>
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {errors.negeri && <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic mt-2">{errors.negeri}</p>}
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic block">
                        Sekolah <span className="text-orange-600">*</span>
                    </label>
                    <button
                        type="button"
                        disabled={!data.negeri}
                        onClick={() => {
                            if (data.negeri) {
                                setShowSchoolPicker(true);
                            }
                        }}
                        className="mt-2 w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 bg-white text-left flex items-center justify-between disabled:opacity-50"
                    >
                        <span>{selectedSchool?.nama || (data.negeri ? 'Pilih sekolah' : 'Pilih negeri dahulu')}</span>
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {errors.school_reference_id && <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic mt-2">{errors.school_reference_id}</p>}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-900">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic mb-2">Ringkasan Pilihan</h4>
                    {selectedSchool ? (
                        <div className="space-y-1">
                            <div className="text-sm font-black italic uppercase text-slate-900">{data.negeri}</div>
                            <div className="text-sm font-black italic uppercase text-slate-900">{selectedSchool.nama}</div>
                        </div>
                    ) : (
                        <p className="text-xs font-bold text-slate-500 italic">Sila pilih negeri dan sekolah.</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-6 py-4 bg-orange-600 text-white border-2 border-slate-900 rounded-xl text-sm font-black uppercase tracking-widest italic hover:bg-slate-900 transition-all disabled:opacity-50"
                >
                    {processing ? 'MEMPROSES...' : 'DAFTAR SEKOLAH'}
                </button>

                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                    Sudah ada akaun?{' '}
                    <Link href={route('login')} className="text-orange-600 hover:text-slate-900 transition-colors underline decoration-2 underline-offset-4">
                        Log Masuk
                    </Link>
                </p>
            </form>

            {showSuccessModal && newSchoolData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm">
                    <div className="w-full max-w-xl bg-white border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(234,88,12,1)] rounded-[2rem] overflow-hidden">
                        <div className="p-6 sm:p-10 text-center">
                            <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-4 leading-none">
                                Sekolah Berjaya<br/><span className="text-emerald-600">Didaftarkan!</span>
                            </h3>

                            <div className="my-6 p-5 bg-slate-50 border-2 border-slate-900 rounded-2xl text-left">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-3">Kredential Admin Sekolah</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Emel Log Masuk</div>
                                        <div className="text-sm sm:text-base font-black italic uppercase text-slate-900 break-all">{newSchoolData.admin_sekolah.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kata Laluan Sementara</div>
                                        <div className="text-xl sm:text-2xl font-black text-orange-600 tabular-nums tracking-widest">{newSchoolData.generated_password}</div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] sm:text-sm font-bold text-slate-500 italic mb-6">
                                Sila simpan kredential ini untuk log masuk Admin Sekolah.
                            </p>

                            <button
                                onClick={() => router.get(route('login'))}
                                className="w-full px-6 py-4 bg-slate-900 text-white text-sm sm:text-base font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all"
                            >
                                SELESAI
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showStatePicker && (
                <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-slate-900/70">
                    <div className="w-full max-w-md bg-white border-4 border-slate-900 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b-2 border-slate-900 flex items-center justify-between">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Pilih Negeri</h4>
                            <button type="button" onClick={() => setShowStatePicker(false)} className="text-slate-500 hover:text-slate-900 font-black">X</button>
                        </div>
                        <div className="p-4 border-b border-slate-200">
                            <input
                                type="text"
                                value={stateSearch}
                                onChange={(e) => setStateSearch(e.target.value)}
                                placeholder="Cari negeri"
                                className="w-full border-2 border-slate-900 rounded-lg px-3 py-2 font-bold text-sm"
                            />
                        </div>
                        <div className="max-h-72 overflow-y-auto">
                            {filteredStates.map((negeri) => (
                                <button
                                    key={negeri}
                                    type="button"
                                    onClick={() => {
                                        setData('negeri', negeri);
                                        setData('school_reference_id', '');
                                        setSchoolSearch('');
                                        setShowStatePicker(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 border-b border-slate-100 font-black text-sm uppercase tracking-tight hover:bg-orange-50 ${data.negeri === negeri ? 'bg-slate-900 text-white hover:bg-slate-900' : 'text-slate-900'}`}
                                >
                                    {negeri}
                                </button>
                            ))}
                            {filteredStates.length === 0 && (
                                <div className="px-4 py-6 text-sm font-bold italic text-slate-500 text-center">Tiada negeri ditemui</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showSchoolPicker && (
                <div className="fixed inset-0 z-[96] flex items-center justify-center p-4 bg-slate-900/70">
                    <div className="w-full max-w-lg bg-white border-4 border-slate-900 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b-2 border-slate-900 flex items-center justify-between">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Pilih Sekolah</h4>
                            <button type="button" onClick={() => setShowSchoolPicker(false)} className="text-slate-500 hover:text-slate-900 font-black">X</button>
                        </div>
                        <div className="p-4 border-b border-slate-200">
                            <input
                                type="text"
                                value={schoolSearch}
                                onChange={(e) => setSchoolSearch(e.target.value)}
                                placeholder="Cari sekolah"
                                className="w-full border-2 border-slate-900 rounded-lg px-3 py-2 font-bold text-sm"
                            />
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {filteredSchools.map((school) => (
                                <button
                                    key={school.id}
                                    type="button"
                                    onClick={() => {
                                        setData('school_reference_id', String(school.id));
                                        setShowSchoolPicker(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 border-b border-slate-100 font-black text-sm uppercase tracking-tight hover:bg-orange-50 ${String(data.school_reference_id) === String(school.id) ? 'bg-slate-900 text-white hover:bg-slate-900' : 'text-slate-900'}`}
                                >
                                    {school.nama}
                                </button>
                            ))}
                            {filteredSchools.length === 0 && (
                                <div className="px-4 py-6 text-sm font-bold italic text-slate-500 text-center">Tiada sekolah ditemui</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
