import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function EventsIndex({ meet, events }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Acara</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {meet.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.meets.show', meet.id)}
                        className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Kejohanan
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Acara" />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Senarai Acara</h3>
                                    <p className="text-slate-500 font-bold italic">
                                        Menguruskan {events.length} acara untuk kejohanan ini.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('admin-sekolah.events.create', meet.id)}
                                className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100"
                            >
                                + Tambah Acara
                            </Link>
                        </div>

                        {flash?.success && (
                            <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-600 text-green-700 font-bold italic rounded-r-xl">
                                {flash.success}
                            </div>
                        )}

                        {events.length === 0 ? (
                            <div className="text-center py-20 border-4 border-dashed border-slate-200 rounded-3xl">
                                <div className="text-slate-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 18.5a6.5 6.5 0 00-6.5-6.5c0-2.54 2.54-4.5 6.5-4.5s6.5 1.96 6.5 4.5a6.5 6.5 0 00-6.5 6.5z" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 font-bold italic mb-6">Belum ada acara dicipta.</p>
                                <Link
                                    href={route('admin-sekolah.events.create', meet.id)}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-orange-100"
                                >
                                    Tambah Acara Pertama
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 border-4 border-slate-900 rounded-2xl overflow-hidden">
                                    <thead className="bg-slate-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Bil</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Nama Acara</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Kategori</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Jantina</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Jenis</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Masa</th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-white">Status</th>
                                            <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-white">Tindakan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white">
                                        {events.map((event, index) => (
                                            <tr key={event.id} className="hover:bg-slate-50 transition-colors group/row">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-500">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-black text-slate-900 uppercase italic">
                                                    {event.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-600">
                                                    {event.category}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-600">
                                                    {event.gender === 'male' ? 'Lelaki' : 
                                                     event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-600">
                                                    {event.type === 'individual' ? 'Individu' : 'Relay'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-slate-600">
                                                    {event.scheduled_time || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        event.is_active ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                                                    }`}>
                                                        {event.is_active ? 'Aktif' : 'Tak Aktif'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-center">
                                                    <Link
                                                        href={route('admin-sekolah.events.show', [meet.id, event.id])}
                                                        className="px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-600 transition-all active:scale-95"
                                                    >
                                                        Lihat
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
