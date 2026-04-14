import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function HousesShow({ house }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {house.name}
                    </h2>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="text-sm text-blue-600 hover:text-blue-900"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={house.name} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{house.name}</h3>
                                    <p className="text-sm text-gray-500">{house.students_count} pelajar</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">{house.points}</div>
                                    <div className="text-sm text-gray-500">Mata</div>
                                </div>
                            </div>
                        </div>
        {/* Teachers Section */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h4 className="text-sm font-semibold text-gray-900">Cikgu-Cikgu Penjaga</h4>
        </div>
        <div className="p-6 border-b border-gray-200">
          {house.teachers && house.teachers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {house.teachers.map((teacher) => (
                <div 
                  key={teacher.id}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                    {teacher.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{teacher.name}</span>
                  <span className="text-xs text-gray-500">{teacher.email}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Tiada cikgu dilantik untuk rumah sukan ini.</p>
          )}
        </div>

        {/* Students Section */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h4 className="text-sm font-semibold text-gray-900">Senarai Pelajar</h4>
        </div>
        <div className="p-6">
          {house.students && house.students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Bil</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nama</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Kelas</th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Jantina</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {house.students.map((student, index) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{student.class}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{student.gender === 'male' ? 'Lelaki' : 'Perempuan'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Tiada pelajar dalam rumah sukan ini.</p>
          )}
        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
