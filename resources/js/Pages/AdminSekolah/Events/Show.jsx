import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventsShow({ meet, event }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {event.name}
                    </h2>
                    <Link
                        href={route('admin-sekolah.events.index', meet.id)}
                        className="text-sm text-blue-600 hover:text-blue-900"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={event.name} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                                    <p className="text-sm text-gray-500">{meet.name}</p>
                                </div>
                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                    event.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {event.is_active ? 'Aktif' : 'Tak Aktif'}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{event.category}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Jantina</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {event.gender === 'male' ? 'Lelaki' : 
                                         event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Jenis</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {event.type === 'individual' ? 'Individu' : 'Relay'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Max Peserta</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{event.max_participants}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Masa Terancang</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{event.scheduled_time || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tarikh Terancang</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{event.scheduled_date || '-'}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 flex gap-3">
                                <Link
                                    href={route('admin-sekolah.events.participants.index', [meet.id, event.id])}
                                    className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                                >
                                    Urus Peserta
                                </Link>

                                <Link
                                    href={route('admin-sekolah.results.index', [meet.id, event.id])}
                                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                >
                                    Keputusan
                                </Link>

                                <Link
                                    href={route('admin-sekolah.events.edit', [meet.id, event.id])}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                                <form action={route('admin-sekolah.events.toggle-active', [meet.id, event.id])} method="POST">
                                    <button
                                        type="submit"
                                        className={`rounded-md px-4 py-2 text-sm font-medium ${
                                            event.is_active
                                                ? 'bg-red-600 text-white hover:bg-red-700'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                        }`}
                                    >
                                        {event.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">Peserta</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-500">
                                Pengurusan peserta akan dilakukan dalam Fasa 3 (Pendaftaran).
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">Keputusan</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-500">
                                Keputusan dan markah akan direkodkan dalam Fasa 4 (Keputusan & Ranking).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
