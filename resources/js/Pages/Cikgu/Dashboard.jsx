import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function CikguDashboard({ stats, houses, sekolah, myHouse, events }) {
  const { flash } = usePage().props;
  
  const myHouseRank = myHouse
    ? houses.filter(h => h.id !== myHouse.id && h.points > (myHouse.points || 0)).length + 1
    : null;

  return (
    <CikguLayout
      header={
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900">
              Panel Rumah
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">
              {sekolah.nama}
            </p>
          </div>
          {myHouse && (
            <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl border-b-4 border-orange-600">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-black italic text-lg">
                #{myHouseRank}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">Kedudukan Semasa</div>
                <div className="font-black uppercase tracking-tight text-lg">{myHouse.name}</div>
              </div>
            </div>
          )}
        </div>
      }
    >
      <Head title={`Dashboard | ${myHouse?.name || 'Cikgu'}`} />

      <div className="space-y-6">
        
        {/* Flash Messages */}
        {(flash?.error || flash?.success) && (
          <div className="space-y-2">
            {flash?.error && (
              <div className="bg-red-50 border-2 border-red-200 p-3 rounded-xl text-red-800 font-bold text-xs">
                {flash.error}
              </div>
            )}
            {flash?.success && (
              <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-xl text-emerald-800 font-bold text-xs">
                {flash.success}
              </div>
            )}
          </div>
        )}

        {/* Lantikan Warning */}
        {!myHouse && (
          <div className="bg-amber-50 border-4 border-amber-400 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-black uppercase italic text-amber-900 mb-2">Lantikan Diperlukan</h3>
            <p className="text-amber-800 font-medium">Sila hubungi pentadbir sekolah untuk dilantik ke rumah sukan sebelum anda boleh menguruskan pelajar dan acara.</p>
          </div>
        )}

        {/* Action List - Compact Horizontal Style */}
        {myHouse && (
          <div className="flex flex-col gap-3">
            <Link 
              href={route('cikgu.students.index')}
              className="group bg-white border-2 border-slate-200 px-5 py-4 rounded-2xl hover:border-blue-600 hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
              </div>
              <div className="flex-1">
                  <h4 className="font-black uppercase tracking-tight text-slate-900 group-hover:text-blue-600 text-sm">Urus Pelajar</h4>
                  <p className="text-slate-500 text-[10px] font-medium leading-tight mt-0.5">Senarai & peruntukan rumah</p>
              </div>
              <div className="text-xl font-black italic text-slate-900 tabular-nums px-2">
                  {stats.total_students}
              </div>
            </Link>

            <Link 
              href={route('cikgu.events.index')}
              className="group bg-white border-2 border-slate-200 px-5 py-4 rounded-2xl hover:border-orange-600 hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
              </div>
              <div className="flex-1">
                  <h4 className="font-black uppercase tracking-tight text-slate-900 group-hover:text-orange-600 text-sm">Daftar Acara</h4>
                  <p className="text-slate-500 text-[10px] font-medium leading-tight mt-0.5">Pendaftaran peserta acara</p>
              </div>
              <div className="text-xl font-black italic text-slate-900 tabular-nums px-2">
                  {events.length}
              </div>
            </Link>
          </div>
        )}

        {/* House Specific Performance - Compact Side-by-Side */}
        {myHouse && (
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 px-5 py-4 rounded-2xl border-b-4 border-orange-600 text-white shadow-md">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500 mb-0.5">Mata Terkumpul</div>
                <div className="text-2xl font-black italic text-white tabular-nums">{myHouse.points || 0}</div>
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl border-2 border-slate-200 shadow-sm">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Jumlah Pelajar</div>
                <div className="text-2xl font-black italic text-slate-900 tabular-nums">{stats.total_students}</div>
              </div>
           </div>
        )}

        {/* Event Participation Summary - Compact Table */}
        {myHouse && (
          <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
              <h3 className="text-white text-xs font-black uppercase italic tracking-tight">Status Penyertaan</h3>
              <span className="text-orange-500 text-[9px] font-black uppercase tracking-widest">Rumah {myHouse.name}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Acara</th>
                    <th className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-400 italic text-center">Peserta</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 5).map((event) => (
                    <tr key={event.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="font-black uppercase tracking-tight text-slate-900 leading-tight">{event.name}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                            {event.category_label} ({event.gender_label})
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                         <div className="flex flex-col items-center">
                            <span className={`font-black italic tabular-nums text-sm ${event.my_house_participants > 0 ? 'text-orange-600' : 'text-slate-300'}`}>
                                {event.my_house_participants} / {event.max_participants}
                            </span>
                            <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                <div 
                                    className="h-full bg-orange-500 transition-all" 
                                    style={{ width: `${Math.min((event.my_house_participants / event.max_participants) * 100, 100)}%` }}
                                />
                            </div>
                         </div>
                      </td>
                    </tr>
                  ))}
                  {events.length > 5 && (
                    <tr>
                      <td colSpan="2" className="px-5 py-3 text-center bg-slate-50">
                        <Link href={route('cikgu.events.index')} className="text-[9px] font-black uppercase tracking-widest text-orange-600 hover:underline">
                          Lihat Semua {events.length} Acara &raquo;
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </CikguLayout>
  );
}
