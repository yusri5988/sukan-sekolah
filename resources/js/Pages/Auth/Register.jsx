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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-500">
                    <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100">
                        <div className="p-8 sm:p-10 text-center">
                            <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
                                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2">
                                Pendaftaran Berjaya!
                            </h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                                Akaun Admin Sekolah telah dicipta
                            </p>

                            <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 text-left border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <svg className="w-12 h-12 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
                                    </svg>
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1.5">
                                            Emel Log Masuk
                                        </label>
                                        <div className="text-sm font-bold text-slate-900 break-all bg-white px-4 py-3 rounded-xl border border-slate-200/60 shadow-sm">
                                            {newSchoolData.admin_sekolah.email}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1.5">
                                            Kata Laluan Sementara
                                        </label>
                                        <div className="text-2xl font-black text-orange-600 tracking-widest tabular-nums bg-white px-4 py-3 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                                            <span>{newSchoolData.generated_password}</span>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter bg-slate-50 px-2 py-1 rounded-md">TEMP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] font-bold text-slate-400 italic mb-8 px-4">
                                Sila simpan kredential ini di tempat yang selamat untuk log masuk sebagai Admin Sekolah.
                            </p>

                            <button
                                onClick={() => router.get(route('login'))}
                                className="w-full px-6 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
                            >
                                SELESAI & LOG MASUK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showStatePicker && (
                <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
                    <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Pilih Negeri</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Tapis mengikut nama negeri</p>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setShowStatePicker(false)} 
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 bg-white">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={stateSearch}
                                    onChange={(e) => setStateSearch(e.target.value)}
                                    placeholder="Cari negeri..."
                                    className="w-full border-slate-200 rounded-xl pl-10 pr-4 py-3 font-bold text-sm focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>
                        <div className="max-h-72 overflow-y-auto p-2">
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
                                    className={`w-full text-left px-4 py-3 rounded-xl font-black text-sm uppercase tracking-tight transition-all mb-1 last:mb-0 ${data.negeri === negeri ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {negeri}
                                </button>
                            ))}
                            {filteredStates.length === 0 && (
                                <div className="px-4 py-10 text-sm font-bold italic text-slate-400 text-center">Tiada negeri ditemui</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showSchoolPicker && (
                <div className="fixed inset-0 z-[106] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
                    <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Pilih Sekolah</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Senarai sekolah di {data.negeri}</p>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setShowSchoolPicker(false)} 
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 bg-white">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={schoolSearch}
                                    onChange={(e) => setSchoolSearch(e.target.value)}
                                    placeholder="Cari nama sekolah..."
                                    className="w-full border-slate-200 rounded-xl pl-10 pr-4 py-3 font-bold text-sm focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>
                        <div className="max-h-80 overflow-y-auto p-2">
                            {filteredSchools.map((school) => (
                                <button
                                    key={school.id}
                                    type="button"
                                    onClick={() => {
                                        setData('school_reference_id', String(school.id));
                                        setShowSchoolPicker(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-black text-sm uppercase tracking-tight transition-all mb-1 last:mb-0 ${String(data.school_reference_id) === String(school.id) ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {school.nama}
                                </button>
                            ))}
                            {filteredSchools.length === 0 && (
                                <div className="px-4 py-12 text-sm font-bold italic text-slate-400 text-center flex flex-col items-center">
                                    <svg className="w-12 h-12 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Tiada sekolah ditemui
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
