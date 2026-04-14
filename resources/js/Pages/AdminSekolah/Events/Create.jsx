import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventsCreate({ meet }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '10-12',
        gender: 'male',
        type: 'individual',
        max_participants: 1,
        scheduled_time: '',
        scheduled_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.store', meet.id));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tambah Acara Baru - {meet.name}
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
            <Head title="Tambah Acara" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Acara <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="Contoh: 100m Perlumbaan"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Kategori Umur <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            >
                                                <option value="7-9">7-9 Tahun</option>
                                                <option value="10-12">10-12 Tahun</option>
                                                <option value="13-15">13-15 Tahun</option>
                                                <option value="16+">16+ Tahun</option>
                                                <option value="all">Semua Umur</option>
                                            </select>
                                            {errors.category && (
                                                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jantina <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            >
                                                <option value="male">Lelaki</option>
                                                <option value="female">Perempuan</option>
                                                <option value="mixed">Campuran</option>
                                            </select>
                                            {errors.gender && (
                                                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jenis <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.type}
                                                onChange={(e) => setData('type', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            >
                                                <option value="individual">Individu</option>
                                                <option value="relay">Relay</option>
                                            </select>
                                            {errors.type && (
                                                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Max Peserta
                                            </label>
                                            <input
                                                type="number"
                                                value={data.max_participants}
                                                onChange={(e) => setData('max_participants', parseInt(e.target.value) || 1)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                min="1"
                                                max="20"
                                            />
                                            {errors.max_participants && (
                                                <p className="mt-1 text-sm text-red-600">{errors.max_participants}</p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Untuk relay, masukkan bilangan ahli Pasukan
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Masa Terancang
                                            </label>
                                            <input
                                                type="time"
                                                value={data.scheduled_time}
                                                onChange={(e) => setData('scheduled_time', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tarikh Terancang
                                            </label>
                                            <input
                                                type="date"
                                                value={data.scheduled_date}
                                                onChange={(e) => setData('scheduled_date', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t pt-6 mt-6">
                                    <Link
                                        href={route('admin-sekolah.events.index', meet.id)}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Mencipta...' : 'Cipta Acara'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
