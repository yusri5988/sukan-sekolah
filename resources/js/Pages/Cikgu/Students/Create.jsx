import { useState } from 'react';
import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function CikguStudentCreate({ sekolah, myHouse, unassignedStudents = [], years = [], classes = [], filterYear = null, filterClass = null }) {
    const [selected, setSelected] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        student_ids: [],
    });

    const toggleStudent = (studentId) => {
        const newSelected = selected.includes(studentId)
            ? selected.filter(id => id !== studentId)
            : [...selected, studentId];
        setSelected(newSelected);
        setData('student_ids', newSelected);
    };

    const toggleAll = () => {
        if (selected.length === unassignedStudents.length) {
            setSelected([]);
            setData('student_ids', []);
        } else {
            const allIds = unassignedStudents.map(s => s.id);
            setSelected(allIds);
            setData('student_ids', allIds);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cikgu.students.store'));
    };

    const groupedByYear = unassignedStudents.reduce((acc, student) => {
        const key = student.year;
        if (!acc[key]) acc[key] = [];
        acc[key].push(student);
        return acc;
    }, {});

    const groupedByClass = unassignedStudents.reduce((acc, student) => {
        const key = student.class;
        if (!acc[key]) acc[key] = [];
        acc[key].push(student);
        return acc;
    }, {});

    const handleFilterChange = (key, value) => {
        const params = {};
        if (key === 'year') {
            params.year = value || null;
            params.class = filterClass || null;
        } else {
            params.year = filterYear || null;
            params.class = value || null;
        }
        router.get(route('cikgu.students.create', params));
    };

    const clearFilters = () => {
        router.get(route('cikgu.students.create'));
    };

    return (
        <CikguLayout
            header={
                <div className="relative overflow-hidden pt-4 pb-2 px-4 sm:px-0">
                    <div className="absolute top-0 left-0 text-[5rem] font-black text-slate-500/5 uppercase italic tracking-tighter leading-none pointer-events-none">
                        ASSIGN
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-1 w-6 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em]">Panel Cikgu</span>
                        </div>
                        <h2 className="text-3xl sm:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Assign <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Assign Pelajar" />

            <div className="space-y-8 pb-32">
                {/* Filter & Context Bar */}
                <div className="space-y-6">
                    {/* Active House Context */}
                    <div className="bg-slate-900 text-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border-b-[8px] border-slate-800 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-1 sm:mb-2">Rumah Suaka Aktif</div>
                            <div className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none">{myHouse?.name}</div>
                        </div>
                        {myHouse?.name && (
                            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-[1.25rem] bg-orange-600 flex items-center justify-center rotate-[5deg] group-hover:rotate-[15deg] transition-transform shadow-[0_0_20px_rgba(234,88,12,0.5)]">
                                 <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            </div>
                        )}
                    </div>
                    
                    {/* Filters & Information Box */}
                    <div className="bg-slate-50 border-4 border-slate-200 p-6 sm:p-8 rounded-[2rem]">
                        <p className="text-sm font-bold text-slate-500 italic leading-snug mb-6 pb-6 border-b-2 border-slate-200">
                            Pilih pelajar dari senarai di bawah untuk dinilai ke dalam <span className="text-slate-900 font-black uppercase">Rumah {myHouse?.name}</span>.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-2">Tapis Senarai Pelajar</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="relative">
                                    <select
                                        value={filterYear || ''}
                                        onChange={(e) => handleFilterChange('year', e.target.value)}
                                        className="w-full appearance-none px-6 py-4 bg-white border-2 border-slate-300 rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-widest italic text-slate-900 focus:ring-0 focus:border-orange-600 cursor-pointer shadow-sm transition-colors"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {years.map((y) => (
                                            <option key={y} value={y}>Tahun {y}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <select
                                        value={filterClass || ''}
                                        onChange={(e) => handleFilterChange('class', e.target.value)}
                                        className="w-full appearance-none px-6 py-4 bg-white border-2 border-slate-300 rounded-2xl text-[11px] sm:text-xs font-black uppercase tracking-widest italic text-slate-900 focus:ring-0 focus:border-orange-600 cursor-pointer shadow-sm transition-colors"
                                    >
                                        <option value="">Semua Kelas</option>
                                        {classes.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            {(filterYear || filterClass) && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-4 py-4 mt-3 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl border-2 border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                    Padam Tapisan (Reset Filter)
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {unassignedStudents.length === 0 ? (
                    <div className="bg-white border-4 border-slate-900 p-12 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-slate-100 transition-colors" />
                        <div className="relative z-10 py-10">
                            <div className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-slate-100 flex items-center justify-center border-2 border-slate-200 rotate-[8deg]">
                                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <h4 className="text-3xl md:text-5xl font-black italic text-slate-900 mb-4 uppercase tracking-tighter">Tiada Pelajar Bebas</h4>
                            <p className="text-slate-500 font-bold italic mb-10 max-w-xs mx-auto text-lg leading-relaxed">
                                Semua pelajar telah berjaya diperuntukkan kepada rumah sukan.
                            </p>
                            <Link
                                href={route('cikgu.students.index')}
                                className="px-12 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all inline-block shadow-2xl"
                            >
                                URUS SENARAI
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative">
                        {/* Sticky Header Actions for Mobile */}
                        <div className="sticky top-2 z-40 mb-6 bg-slate-900/95 backdrop-blur-md border-x-4 border-t-4 border-b-[8px] border-slate-900 px-6 py-5 rounded-[2.5rem] shadow-2xl flex items-center justify-between group transition-all">
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={toggleAll}
                                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                                        selected.length === unassignedStudents.length 
                                        ? 'bg-orange-600 border-orange-600' 
                                        : 'border-white/30 hover:border-white'
                                    }`}
                                >
                                    {selected.length === unassignedStudents.length && (
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500 block">Pilih Semua</span>
                                    <span className="text-xs font-black text-white uppercase tracking-widest tabular-nums">
                                        {selected.length} / {unassignedStudents.length} Pelajar
                                    </span>
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={processing || selected.length === 0}
                                className="px-8 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl active:scale-95"
                            >
                                {processing ? '...' : `Assign →`}
                            </button>
                        </div>

                        <div className="space-y-10 group/list">
                            {Object.entries(groupedByYear).sort(([a], [b]) => Number(a) - Number(b)).map(([year, students]) => (
                                <div key={year} className="space-y-4">
                                    <div className="flex items-center gap-4 px-2">
                                        <div className="h-[2px] w-8 bg-slate-300" />
                                        <h5 className="text-xl font-black italic uppercase tracking-tighter text-slate-400">Tahun {year}</h5>
                                        <div className="h-[2px] flex-1 bg-slate-100" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-3">
                                        {students.map((student) => {
                                            const isSelected = selected.includes(student.id);
                                            return (
                                                <div
                                                    key={student.id}
                                                    onClick={() => toggleStudent(student.id)}
                                                    className={`group/card relative bg-white border-2 rounded-[1.5rem] p-5 cursor-pointer transition-all duration-300 ${
                                                        isSelected 
                                                        ? 'border-orange-600 bg-orange-50 shadow-[6px_6px_0px_0px_rgba(234,88,12,1)] -translate-y-1' 
                                                        : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-5">
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                                                isSelected ? 'bg-orange-600 text-white rotate-[-3deg]' : 'bg-slate-100 text-slate-400'
                                                            }`}>
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className={`text-xl font-black italic tracking-tight uppercase leading-none transition-colors ${
                                                                    isSelected ? 'text-orange-900' : 'text-slate-900'
                                                                }`}>
                                                                    {student.name}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1.5">
                                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                                                        isSelected ? 'bg-orange-200 text-orange-900' : 'bg-slate-200 text-slate-500'
                                                                    }`}>
                                                                        {student.class}
                                                                    </span>
                                                                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                                                                        {student.ic_number}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={`w-6 h-6 rounded-full border-4 flex-shrink-0 transition-all ${
                                                            isSelected ? 'bg-orange-600 border-orange-200 scale-110' : 'bg-white border-slate-100'
                                                        }`} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Final Bottom Action (Optional, as we have sticky) */}
                        <div className="mt-12 flex items-center justify-center">
                            <Link
                                href={route('cikgu.students.index')}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-orange-600 transition-colors"
                            >
                                ← Batal & Kembali
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </CikguLayout>
    );
}
