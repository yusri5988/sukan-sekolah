import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import CountdownHero from '@/Components/CountdownHero';

const statCards = [
  {
    label: 'Pelajar Rumah Saya',
    key: 'total_students',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    bg: 'bg-blue-600',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(37,99,235,0.3)]',
    border: 'border-blue-200',
  },
];

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic shrink-0">{label}</h3>
      <div className="h-px bg-slate-200 flex-1" />
    </div>
  );
}

export default function CikguDashboard({ stats, houses, sekolah, myHouse, events }) {
  const { flash } = usePage().props;
  const myHouseRank = myHouse
    ? houses.filter(h => h.id !== myHouse.id && h.points > (myHouse.points || 0)).length + 1
    : null;

  return (
    <CikguLayout
      header={
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-8 h-[2px] bg-orange-600" />
              <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
              {sekolah.nama}
            </h2>
          </div>
          {myHouse ? (
            <div className="px-5 py-3 bg-slate-900 text-white rounded-xl shadow-[6px_6px_0px_0px_rgba(234,88,12,0.5)] border-2 border-orange-600/50">
              <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">Rumah Saya</div>
              <div className="text-base font-black uppercase tracking-widest">{myHouse.name}</div>
            </div>
          ) : (
            <div className="px-5 py-3 bg-amber-50 text-amber-800 rounded-xl shadow-[6px_6px_0px_0px_rgba(251,191,36,0.4)] border-2 border-amber-400">
              <div className="text-[10px] font-black uppercase tracking-widest">Belum Dilantik</div>
              <div className="text-sm font-black">Hubungi admin sekolah</div>
            </div>
          )}
        </div>
      }
    >
      <Head title={`Dashboard Cikgu | ${sekolah.nama}`} />

      <div className="space-y-14">

        {/* Countdown Hero */}
        <CountdownHero meet={sekolah.meet} />

        {/* Flash Messages */}
        {flash?.error && (
          <div className="rounded-[2rem] border-4 border-red-400 bg-red-50 p-6 shadow-[6px_6px_0px_0px_rgba(248,113,113,0.3)]">
            <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
            <div className="text-sm font-bold italic text-red-900">{flash.error}</div>
          </div>
        )}
        {flash?.success && (
          <div className="rounded-[2rem] border-4 border-emerald-400 bg-emerald-50 p-6 shadow-[6px_6px_0px_0px_rgba(52,211,153,0.3)]">
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
            <div className="text-sm font-bold italic text-emerald-900">{flash.success}</div>
          </div>
        )}

        {/* Unassigned Warning */}
        {!myHouse && (
          <div className="bg-amber-50 border-4 border-amber-400 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(251,191,36,0.3)]">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-amber-900 mb-2">
                  Lantikan Diperlukan
                </h3>
                <p className="text-amber-800 font-bold leading-relaxed">
                  Admin sekolah perlu melantik anda kepada sebuah rumah sukan terlebih dahulu, atau menetapkan semula jika rumah anda telah dipadam.
                </p>
                <p className="text-amber-700 text-sm mt-3 font-semibold">
                  Sila hubungi admin sekolah untuk tindakan lanjut.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {myHouse && (
          <div className="space-y-6">
            <SectionLabel label="Gambaran Keseluruhan" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((stat, i) => {
                const value = stats[stat.key];
                return (
                  <div
                    key={i}
                    className={`bg-white border-4 border-slate-900 p-8 rounded-[2rem] ${stat.shadow} hover:-translate-y-1 transition-all duration-200 group cursor-default`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 group-hover:text-slate-900 transition-colors">
                          {stat.label}
                        </div>
                        <div className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 tabular-nums">
                          {value}
                        </div>
                        <div className={`h-1.5 rounded-full mt-3 transition-all duration-500 ${stat.bg} ${value > 0 ? 'opacity-100' : 'opacity-30'} max-w-[${Math.min(value * 20, 100)}%]`}
                          style={{ width: `${Math.min(value * 10, 100)}%` }}
                        />
                      </div>
                      <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={stat.icon} />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* My House Hero Section */}
        {myHouse && (
          <div className="space-y-6">
            <SectionLabel label="Rumah Saya" />

            <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
              {/* Decorative watermark */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden uppercase font-black text-[12vw] leading-none text-white flex flex-col gap-0 items-center justify-center rotate-[-10deg]">
                <div>{myHouse.name}</div>
              </div>

              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 z-20" />

              <div className="relative z-10">
                {/* Header */}
                <div className="px-8 md:px-12 pt-10 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse shadow-lg shadow-orange-500/50" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Rumah Saya</div>
                      <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
                        {myHouse.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 border border-white/10 px-5 py-2 rounded-xl text-center">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kedudukan</div>
                      <div className="text-xl font-black italic text-white tabular-nums">
                        {myHouseRank === 1 ? (
                          <span className="text-yellow-400">#1</span>
                        ) : myHouseRank === 2 ? (
                          <span className="text-slate-300">#2</span>
                        ) : myHouseRank === 3 ? (
                          <span className="text-orange-400">#3</span>
                        ) : (
                          `#${myHouseRank}`
                        )}
                      </div>
                    </div>
                    <div className="bg-orange-600/20 border border-orange-600/30 px-5 py-2 rounded-xl text-center">
                      <div className="text-[9px] font-black uppercase tracking-widest text-orange-400">Mata</div>
                      <div className="text-xl font-black italic text-orange-500 tabular-nums">{myHouse.points || 0}</div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
                      <div className="text-5xl font-black italic text-white mb-2 tabular-nums">{stats.total_students}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pelajar Aktif</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
                      <div className="text-5xl font-black italic text-white mb-2 tabular-nums">{myHouse.points || 0}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">Mata Terkumpul</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </CikguLayout>
  );
}
