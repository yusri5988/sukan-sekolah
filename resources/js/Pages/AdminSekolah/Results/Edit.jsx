import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResultsEdit({ event, result, participants, houses }) {
    const { data, setData, patch, processing, errors } = useForm({
        event_participant_id: result.event_participant_id || '',
        house_id: result.house_id,
        position: result.position,
        time_record: result.time_record || '',
        notes: result.notes || '',
        is_verified: result.is_verified,
        is_locked: result.is_locked,
    });

    const handleParticipantChange = (participantId) => {
        const participant = participants.find(p => p.id === parseInt(participantId));
        setData(prevData => ({
            ...prevData,
            event_participant_id: participantId,
            house_id: participant ? participant.house_id : prevData.house_id,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin-sekolah.results.update', [event.id, result.id]));
    };

    return (
        <AdminSekolahLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Keputusan</h2>}
        >
            <Head title="Edit Keputusan" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Peserta</label>
                                    <select 
                                        value={data.event_participant_id} 
                                        onChange={(e) => handleParticipantChange(e.target.value)} 
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    >
                                        <option value="">Pilih peserta</option>
                                        {participants.map((p) => (
                                            <option key={p.id} value={p.id}>{p.student?.name} ({p.student?.house?.name})</option>
                                        ))}
                                    </select>
                                    {errors.event_participant_id && <p className="mt-1 text-sm text-red-600">{errors.event_participant_id}</p>}
                                </div>

                                {!data.event_participant_id && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rumah Sukan (Jika Tiada Peserta Individu)</label>
                                        <select 
                                            value={data.house_id} 
                                            onChange={(e) => setData('house_id', e.target.value)} 
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        >
                                            <option value="">Pilih rumah</option>
                                            {houses.map((house) => (
                                                <option key={house.id} value={house.id}>{house.name}</option>
                                            ))}
                                        </select>
                                        {errors.house_id && <p className="mt-1 text-sm text-red-600">{errors.house_id}</p>}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempat</label>
                                    <input type="number" value={data.position} onChange={(e) => setData('position', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" min="1" />
                                    {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Masa</label>
                                    <input type="text" value={data.time_record} onChange={(e) => setData('time_record', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nota</label>
                                    <textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows="3" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input type="checkbox" checked={data.is_verified} onChange={(e) => setData('is_verified', e.target.checked)} /> Verified
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input type="checkbox" checked={data.is_locked} onChange={(e) => setData('is_locked', e.target.checked)} /> Lock
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 border-t pt-6">
                                    <Link href={route('admin-sekolah.results.index', event.id)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</Link>
                                    <button type="submit" disabled={processing} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
