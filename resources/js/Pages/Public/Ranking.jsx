import { Head, Link } from '@inertiajs/react';

export default function PublicRanking({ meet, ranking }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title={`Ranking - ${meet.name}`} />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Live Ranking</p>
                        <h1 className="text-3xl font-semibold">{meet.name}</h1>
                    </div>
                    <Link href={route('public.meets.show', meet.sekolah_code)} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
                        Kembali
                    </Link>
                </div>

                <div className="space-y-4">
                    {ranking.map((house, index) => (
                        <div key={house.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-bold">{index + 1}</div>
                                <div>
                                    <div className="text-lg font-semibold">{house.name}</div>
                                    <div className="text-sm text-slate-300">{house.students_count} pelajar</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">{house.points}</div>
                                <div className="text-sm text-slate-300">mata</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
