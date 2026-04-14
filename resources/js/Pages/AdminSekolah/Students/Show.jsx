import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function StudentsShow({ student }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail Pelajar
                    </h2>
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className="text-sm text-blue-600 hover:text-blue-900"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={student.name} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                            {student.house && (
                                <span
                                    className="mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold text-white"
                                    style={{ backgroundColor: student.house.color || '#6b7280' }}
                                >
                                    {student.house.name}
                                </span>
                            )}
                        </div>
                        <div className="p-6">
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">No. Kad Pengenalan</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{student.ic_number}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Kelas</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{student.class}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Jantina</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{student.gender === 'male' ? 'Lelaki' : 'Perempuan'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tarikh Lahir</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{new Date(student.date_of_birth).toLocaleDateString('ms-MY')}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Umur</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{student.age} tahun</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Rumah Sukan</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {student.house ? student.house.name : <span className="text-red-500">Belum assign</span>}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
