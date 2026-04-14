import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function StudentsImport() {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.students.process-import'), {
            forceFormData: true,
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Import Pelajar dari CSV
                </h2>
            }
        >
            <Head title="Import Pelajar" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fail CSV <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => setData('file', e.target.files[0])}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.file && (
                                        <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                                    )}
                                </div>

                                <div className="mb-6 rounded-md bg-gray-50 p-4">
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Format CSV yang diperlukan:</h3>
                                    <p className="mb-2 text-sm text-gray-600">
                                        Fail CSV anda mestilah mempunyai header dengan kolum berikut:
                                    </p>
                                    <code className="block text-xs text-gray-800 bg-white p-2 rounded border">
                                        name, ic_number, class, gender, date_of_birth, house_id (optional)
                                    </code>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Contoh: <br />
                                        name,ic_number,class,gender,date_of_birth<br />
                                        Ahmad bin Ali,200112345678,6Bestari,male,2012-05-15
                                    </p>
                                </div>

                                <div className="mb-6 rounded-md bg-yellow-50 p-4">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Nota:</strong>
                                    </p>
                                    <ul className="mt-1 list-inside list-disc text-sm text-yellow-700">
                                        <li>Header mestilah ada dalam fail</li>
                                        <li>Baris dengan No. KP yang sudah wujud akan dikemaskini</li>
                                        <li>Baris baru akan dicipta untuk No. KP yang belum ada</li>
                                        <li>House_id adalah optional - boleh assign nanti</li>
                                    </ul>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t pt-6">
                                    <Link
                                        href={route('admin-sekolah.students.index')}
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || !data.file}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Memproses...' : 'Import Pelajar'}
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
