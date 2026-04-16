import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ResultsIndex({ event, results, ranking }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">Keputusan - {event.name}</h2>
                        <p className="text-sm text-gray-500">Live ranking rumah sukan</p>
                    </div>
                    <Link href={route('admin-sekolah.events.show', event.id)} className="text-sm text-blue-600 hover:text-blue-900">
                        ← Kembali ke Acara
                    </Link>
                </div>
            }
        >
            <Head title={`Keputusan - ${event.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">{flash.success}</div>}

                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Keputusan Acara</h3>
                                <Link href={route('admin-sekolah.results.create', event.id)} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                                    + Tambah Keputusan
                                </Link>
                            </div>
                            <div className="p-6">
                                {results.length === 0 ? (
                                    <p className="text-sm text-gray-500">Belum ada keputusan direkodkan.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {results.map((result) => (
                                            <div key={result.id} className="rounded-lg border p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {result.participant?.student?.name ? (
                                                                <>
                                                                    {result.participant.student.name} 
                                                                    <span className="ml-2 text-sm text-gray-500">({result.house?.name})</span>
                                                                </>
                                                            ) : (
                                                                result.house?.name
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">Tempat {result.position} · {result.points} mata</div>
                                                        <div className="text-xs text-gray-500">Masa: {result.time_record || '-'}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${result.is_locked ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {result.is_locked ? 'Locked' : 'Draft'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <Link href={route('admin-sekolah.results.edit', [event.id, result.id])} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Edit</Link>
                                                    <form action={route('admin-sekolah.results.toggle-lock', [event.id, result.id])} method="POST">
                                                        <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">{result.is_locked ? 'Unlock' : 'Lock'}</button>
                                                    </form>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Live Ranking Rumah Sukan</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                {ranking.map((house, index) => (
                                    <div key={house.id} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">{index + 1}</div>
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
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
