import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MeetsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date: '',
        description: '',
        point_config: {
            '1': 5,
            '2': 3,
            '3': 1,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.meets.store'));
    };

    const updatePointConfig = (position, value) => {
        setData('point_config', {
            ...data.point_config,
            [position]: parseInt(value) || 0,
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cipta Meet Baru
                </h2>
            }
        >
            <Head title="Cipta Meet" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Meet <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="Contoh: Hari Sukan 2026"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tarikh <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                        {errors.date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Keterangan
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="3"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            placeholder="Optional description for this meet"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Konfigurasi Mata
                                        </label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map((position) => (
                                                <div key={position}>
                                                    <label className="block text-xs text-gray-500 mb-1">
                                                        Tempat {position}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={data.point_config[position]}
                                                        onChange={(e) => updatePointConfig(position, e.target.value)}
                                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                        min="0"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Default: Johan=5 mata, Naib Johan=3 mata, Ketiga=1 mata
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t pt-6 mt-6">
                                    <Link
                                        href={route('admin-sekolah.meets.index')}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Mencipta...' : 'Cipta Meet'}
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
