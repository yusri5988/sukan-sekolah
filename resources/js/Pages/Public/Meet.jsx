import { Head, Link } from '@inertiajs/react';

export default function PublicMeet({ meet, events, ranking }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Head title={meet.name} />

            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Hari Sukan</p>
                            <h1 className="text-3xl font-semibold">{meet.name}</h1>
                            <p className="mt-1 text-sm text-slate-500">{new Date(meet.date).toLocaleDateString('ms-MY')}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href={route('public.meets.ranking', meet.id)} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                                Live Ranking
                            </Link>
                        </div>
                    </div>
                    {meet.description && <p className="mt-4 max-w-3xl text-sm text-slate-600">{meet.description}</p>}
                </div>
            </div>

            <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
                <section className="space-y-6">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Jadual & Result Live</h2>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Public View</span>
                        </div>

                        <div className="space-y-4">
                            {events.map((event) => (
                                <article key={event.id} className="rounded-xl border border-slate-200 p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{event.name}</h3>
                                            <p className="text-sm text-slate-500">{event.category} · {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'} · {event.type === 'individual' ? 'Individu' : 'Relay'}</p>
                                            <p className="text-sm text-slate-500">{event.scheduled_date || '-'} {event.scheduled_time || ''}</p>
                                        </div>
                                        <div className="text-sm text-slate-500">Peserta: {event.participants_count}</div>
                                    </div>

                                    <div className="mt-4 overflow-x-auto">
                                        {event.results.length === 0 ? (
                                            <p className="text-sm text-slate-500">Belum ada result.</p>
                                        ) : (
                                            <table className="min-w-full text-left text-sm">
                                                <thead>
                                                    <tr className="border-b text-slate-500">
                                                        <th className="py-2 pr-4">Tempat</th>
                                                        <th className="py-2 pr-4">Rumah</th>
                                                        <th className="py-2 pr-4">Mata</th>
                                                        <th className="py-2 pr-4">Catatan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {event.results.map((result) => (
                                                        <tr key={result.id} className="border-b last:border-0">
                                                            <td className="py-2 pr-4 font-medium">{result.position}</td>
                                                            <td className="py-2 pr-4">{result.house?.name}</td>
                                                            <td className="py-2 pr-4">{result.points}</td>
                                                            <td className="py-2 pr-4">{result.time_record || '-'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <aside className="space-y-6">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Ranking Rumah Sukan</h2>
                            <Link href={route('public.meets.ranking', meet.id)} className="text-sm text-blue-600 hover:text-blue-800">Buka penuh</Link>
                        </div>
                        <div className="space-y-3">
                            {ranking.map((house, index) => (
                                <div key={house.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-bold">{index + 1}</div>
                                        <div>
                                            <div className="font-medium">{house.name}</div>
                                            <div className="text-xs text-slate-500">{house.students_count} pelajar</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold">{house.points}</div>
                                        <div className="text-xs text-slate-500">mata</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
