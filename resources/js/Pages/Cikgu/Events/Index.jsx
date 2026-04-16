import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function CikguEventsIndex({ events, categories, genders, myHouse, filters }) {
    const { flash } = usePage().props;

    const handleFilter = (key, value) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get(`${window.location.pathname}?${params.toString()}`, {}, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const search = form.get('search');
        const params = new URLSearchParams(window.location.search);
        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }
        router.get(`${window.location.pathname}?${params.toString()}`, {}, { preserveState: true });
    };

    const getCategoryLabel = (category) => {
        const labels = {
            '7-9': '7-9 Tahun',
            '10-12': '10-12 Tahun',
            '13-15': '13-15 Tahun',
            '16+': '16+ Tahun',
            'tahun_1': 'Tahun 1',
            'tahun_2': 'Tahun 2',
            'tahun_3': 'Tahun 3',
            'tahun_4': 'Tahun 4',
            'tahun_5': 'Tahun 5',
            'tahun_6': 'Tahun 6',
            'all': 'Semua Umur',
        };
        return labels[category] || category;
    };

    const getGenderLabel = (gender) => {
        const labels = {
            'male': 'Lelaki',
            'female': 'Perempuan',
            'mixed': 'Campuran',
        };
        return labels[gender] || gender;
    };

    const getTypeLabel = (type) => {
        return type === 'individual' ? 'Individu' : 'Relay';
    };

    const getGenderBadgeColor = (gender) => {
        if (gender === 'male') return 'bg-blue-100 text-blue-700 border-blue-200';
        if (gender === 'female') return 'bg-pink-100 text-pink-700 border-pink-200';
        return 'bg-purple-100 text-purple-700 border-purple-200';
    };

    const getTypeBadgeColor = (type) => {
        return type === 'individual' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200';
    };

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu - Rumah {myHouse?.name || 'Belum dilantik'}</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Pendaftaran <span className="text-orange-600">Acara</span>
                        </h2>
                    </div>
                    <Link
                        href={route('cikgu.dashboard')}
                        className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                    >
                        ← Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Pendaftaran Acara" />

            <div className="space-y-8">
                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {!myHouse && (
                    <div className="bg-amber-50 border-4 border-amber-400 p-8 rounded-[2rem]">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-amber-900 mb-2">
                                    Lantikan Diperlukan
                                </h3>
                                <p className="text-amber-800 font-bold leading-relaxed">
                                    Anda belum dilantik kepada rumah sukan. Sila hubungi admin sekolah untuk tindakan lanjut.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                    <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black italic uppercase tracking-widest text-white">Carian & Tapis</h3>
                            <p className="text-xs text-slate-400 font-bold italic mt-1">Cari acara atau tapis mengikut kategori dan jantina</p>
                        </div>
                        {(filters.category || filters.gender || filters.search) && (
                            <Link
                                href={route('cikgu.events.index')}
                                className="px-4 py-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-700 transition-all"
                            >
                                Reset Tapisan
                            </Link>
                        )}
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="search"
                                        defaultValue={filters.search || ''}
                                        placeholder="Cari nama acara..."
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <select
                                        value={filters.category || ''}
                                        onChange={(e) => handleFilter('category', e.target.value)}
                                        className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 bg-white focus:border-orange-500 focus:ring-0"
                                    >
                                        <option value="">Semua Kategori</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={filters.gender || ''}
                                        onChange={(e) => handleFilter('gender', e.target.value)}
                                        className="px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 bg-white focus:border-orange-500 focus:ring-0"
                                    >
                                        <option value="">Semua Jantina</option>
                                        {genders.map((gen) => (
                                            <option key={gen} value={gen}>{getGenderLabel(gen)}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="bg-white border-4 border-dashed border-slate-200 rounded-[2.5rem] py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-slate-400 font-black italic uppercase tracking-widest text-sm">Tiada acara ditemui</p>
                        <p className="text-slate-300 font-bold italic text-xs mt-2">Cuba ubah tapisan atau hubungi admin sekolah</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                href={route('cikgu.events.participants.index', event.id)}
                                className="group bg-white border-4 border-slate-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all active:scale-[0.98]"
                            >
                                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{event.type_label}</div>
                                            <div className="text-sm font-black italic uppercase tracking-tight text-white leading-none">{event.category_label}</div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getGenderBadgeColor(event.gender)}`}>
                                        {event.gender_label}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 leading-tight group-hover:text-orange-600 transition-colors mb-4">
                                        {event.name}
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Peserta Rumah</div>
                                                <div className="text-2xl font-black italic text-slate-900">{event.my_house_participants}</div>
                                            </div>
                                            <div className="w-px h-10 bg-slate-200" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Jumlah</div>
                                                <div className="text-2xl font-black italic text-slate-900">
                                                    {event.total_participants}{event.max_participants ? `/${event.max_participants}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </CikguLayout>
    );
}
