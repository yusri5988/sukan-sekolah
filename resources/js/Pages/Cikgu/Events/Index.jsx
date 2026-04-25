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

    const getGenderBadgeColor = (gender) => {
        if (gender === 'male') return 'bg-blue-100 text-blue-700 border-blue-200';
        if (gender === 'female') return 'bg-pink-100 text-pink-700 border-pink-200';
        return 'bg-purple-100 text-purple-700 border-purple-200';
    };

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900">
                            Pendaftaran Acara
                        </h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">
                            Rumah {myHouse?.name || 'Sila hubungi admin'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Pendaftaran Acara" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {(flash?.error || flash?.success) && (
                    <div className="space-y-2">
                        {flash?.error && (
                            <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl text-red-800 font-bold text-xs text-center">
                                {flash.error}
                            </div>
                        )}
                        {flash?.success && (
                            <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-xl text-emerald-800 font-bold text-xs text-center">
                                {flash.success}
                            </div>
                        )}
                    </div>
                )}

                {!myHouse && (
                    <div className="bg-amber-50 border-4 border-amber-400 p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-black uppercase italic text-amber-900 mb-2">Lantikan Diperlukan</h3>
                        <p className="text-amber-800 font-medium text-sm">Sila hubungi pentadbir sekolah untuk dilantik ke rumah sukan sebelum anda boleh mendaftarkan peserta.</p>
                    </div>
                )}

                {/* Filter & Search Bar - Compact Style */}
                <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                    <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
                        <h3 className="text-white text-xs font-black uppercase italic tracking-tight">Tapis Acara</h3>
                        {(filters.category || filters.gender || filters.search) && (
                            <Link href={route('cikgu.events.index')} className="text-[9px] font-black uppercase tracking-widest text-orange-500 hover:underline">Reset</Link>
                        )}
                    </div>
                    <div className="p-4 space-y-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Cari acara..."
                                className="flex-1 px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 transition-all"
                            />
                            <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic hover:bg-orange-600 transition-colors shrink-0">Cari</button>
                        </form>
                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={filters.category || ''}
                                onChange={(e) => handleFilter('category', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 focus:border-orange-500 focus:ring-0"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat.replace('tahun_', 'Tahun ')}</option>
                                ))}
                            </select>
                            <select
                                value={filters.gender || ''}
                                onChange={(e) => handleFilter('gender', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 focus:border-orange-500 focus:ring-0"
                            >
                                <option value="">Semua Jantina</option>
                                {genders.map((gen) => (
                                    <option key={gen} value={gen}>{gen === 'male' ? 'Lelaki' : gen === 'female' ? 'Perempuan' : 'Campuran'}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Events Grid/List */}
                {events.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-12 text-center">
                        <div className="text-slate-200 mb-2 text-4xl font-black italic opacity-20 select-none">TIADA</div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">Tiada acara ditemui.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                href={route('cikgu.events.participants.index', event.id)}
                                className="group bg-white border-2 border-slate-200 px-5 py-4 rounded-2xl hover:border-orange-600 hover:shadow-md transition-all flex items-center gap-4"
                            >
                                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="font-black uppercase tracking-tight text-slate-900 group-hover:text-orange-600 text-sm truncate">
                                            {event.name}
                                        </h4>
                                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border ${getGenderBadgeColor(event.gender)}`}>
                                            {event.gender_label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{event.category_label}</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{event.type_label}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 px-2">
                                    <div className="text-xl font-black italic text-slate-900 tabular-nums leading-none">
                                        {event.my_house_participants}<span className="text-[10px] text-slate-300 not-italic ml-0.5">/{event.max_participants || '∞'}</span>
                                    </div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1 italic">Peserta</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </CikguLayout>
    );
}
