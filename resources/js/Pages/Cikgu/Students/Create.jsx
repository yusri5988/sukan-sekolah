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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Assign <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Rumah</div>
                            <div className="text-sm font-black">{myHouse?.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select
                                    value={filterYear || ''}
                                    onChange={(e) => handleFilterChange('year', e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border-4 border-slate-900 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-900 focus:outline-none focus:border-orange-600 cursor-pointer hover:bg-slate-50 transition-all"
                                >
                                    <option value="">Semua Tahun</option>
                                    {years.map((y) => (
                                        <option key={y} value={y}>Tahun {y}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative">
                                <select
                                    value={filterClass || ''}
                                    onChange={(e) => handleFilterChange('class', e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2 bg-white border-4 border-slate-900 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-900 focus:outline-none focus:border-orange-600 cursor-pointer hover:bg-slate-50 transition-all"
                                >
                                    <option value="">Semua Kelas</option>
                                    {classes.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {(filterYear || filterClass) && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-4 py-2 bg-red-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Assign Pelajar" />

            <div className="space-y-8">
                <div className="mb-8 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl">
                    <span className="text-sm font-bold text-orange-800 italic">
                        Pilih pelajar yang ingin diperuntukkan ke Rumah {myHouse?.name}
                    </span>
                </div>

                {unassignedStudents.length === 0 ? (
                    <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <p className="text-xl font-black italic text-slate-900 mb-2">Tiada Pelajar Bebas</p>
                        <p className="text-sm font-bold text-slate-500 italic mb-6">
                            Semua pelajar telah pun diperuntukkan kepada rumah sukan.
                        </p>
                        <Link
                            href={route('cikgu.students.index')}
                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all inline-block"
                        >
                            Kembali ke Senarai
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={toggleAll}
                                        className="w-6 h-6 rounded border-2 border-white/30 flex items-center justify-center transition-colors"
                                        style={{ 
                                            backgroundColor: selected.length === unassignedStudents.length ? 'rgb(249 115 22)' : 'transparent',
                                            borderColor: selected.length === unassignedStudents.length ? 'rgb(249 115 22)' : 'rgba(255,255,255,0.3)'
                                        }}
                                    >
                                        {selected.length === unassignedStudents.length && (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        Pilih Semua ({selected.length}/{unassignedStudents.length})
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing || selected.length === 0}
                                    className="px-6 py-3 bg-orange-600 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Memproses...' : `Assign (${selected.length})`}
                                </button>
                            </div>

                            <div className="divide-y-4 divide-slate-900">
                                {Object.entries(groupedByYear).sort(([a], [b]) => Number(a) - Number(b)).map(([year, students]) => (
                                    <div key={year}>
                                        <div className="px-6 py-3 bg-slate-100 border-b-4 border-slate-900">
                                            <span className="text-xs font-black uppercase tracking-widest text-slate-600">
                                                Tahun {year}
                                            </span>
                                        </div>
                                        {students.map((student) => {
                                            const isSelected = selected.includes(student.id);
                                            return (
                                                <div
                                                    key={student.id}
                                                    className={`flex items-center justify-between p-6 cursor-pointer transition-colors ${isSelected ? 'bg-orange-50' : 'hover:bg-slate-50'}`}
                                                    onClick={() => toggleStudent(student.id)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors"
                                                            style={{ 
                                                                backgroundColor: isSelected ? 'rgb(249 115 22)' : 'transparent',
                                                                borderColor: isSelected ? 'rgb(249 115 22)' : 'rgb(203 213 225)'
                                                            }}
                                                        >
                                                            {isSelected && (
                                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-lg font-black italic text-slate-900">
                                                                {student.name}
                                                            </div>
                                                            <div className="text-xs font-bold text-slate-500">
                                                                {student.ic_number} &bull; {student.class}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-orange-600' : 'bg-slate-200'}`} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <Link
                                href={route('cikgu.students.index')}
                                className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </CikguLayout>
    );
}
