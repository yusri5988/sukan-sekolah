import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';

export default function TeachersIndex({ teachers }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Adakah anda pasti ingin memadam akaun guru ini?')) {
            destroy(route('admin-sekolah.teachers.destroy', id));
        }
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Sumber Manusia</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Guru</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.teachers.create')}
                        className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 text-center"
                    >
                        + Daftar Guru
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Guru" />

            <div className="space-y-8">
                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                <div className="bg-white border-4 border-slate-900 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-black italic uppercase tracking-widest text-xs">
                <th className="px-8 py-6">Nama Guru</th>
                <th className="px-8 py-6">Emel</th>
                <th className="px-8 py-6">Rumah Sukan</th>
                <th className="px-8 py-6">Tarikh Daftar</th>
                <th className="px-8 py-6 text-right">Tindakan</th>
              </tr>
            </thead>
                            <tbody className="divide-y-4 divide-slate-50">
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="text-slate-300 mb-4 text-6xl font-black italic opacity-20 select-none">KOSONG</div>
                    <p className="text-slate-400 font-bold italic">Tiada guru yang didaftarkan lagi.</p>
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black italic text-xl group-hover:bg-orange-600 transition-colors">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="font-black italic text-slate-900 uppercase tracking-tighter">
                          {teacher.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-500 italic">
                      {teacher.email}
                    </td>
                    <td className="px-8 py-6">
                      {teacher.house ? (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-slate-200"
                            style={{ backgroundColor: teacher.house.color || '#94a3b8' }}
                          />
                          <span className="text-sm font-bold text-slate-700 italic">
                            {teacher.house.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-bold italic">Belum dilantik</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-slate-400 text-sm font-bold italic">
                      {new Date(teacher.created_at).toLocaleDateString('ms-MY')}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest italic rounded-lg border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                      >
                        Padam Akaun
                      </button>
                    </td>
                  </tr>
                ))
              )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
