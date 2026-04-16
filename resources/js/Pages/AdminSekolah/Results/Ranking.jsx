import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function ResultsRanking({ event, ranking }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Ranking - {event.name}</h2>
                    <Link href={route('admin-sekolah.results.index', event.id)} className="text-sm text-blue-600 hover:text-blue-900">← Kembali</Link>
                </div>
            }
        >
            <Head title="Ranking" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-3">
                    {ranking.map((house, index) => (
                        <div key={house.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold">{index + 1}</div>
                                <div>
                                    <div className="font-medium text-gray-900">{house.name}</div>
                                    <div className="text-sm text-gray-500">{house.students_count} pelajar</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{house.points}</div>
                                <div className="text-xs text-gray-500">mata</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
