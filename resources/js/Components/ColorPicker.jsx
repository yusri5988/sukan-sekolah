import { HOUSE_COLORS } from '@/constants/colors';

export default function ColorPicker({ value, onChange, error }) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                Pilih Warna Rumah <span className="text-orange-600">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                {HOUSE_COLORS.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`h-14 sm:h-16 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all transform active:scale-95 flex flex-col items-center justify-center gap-1 ${
                            value === option.value
                                ? 'border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] -translate-y-1 scale-105'
                                : 'border-slate-200 hover:border-slate-300 shadow-none translate-y-0 scale-100'
                        }`}
                        style={{ backgroundColor: option.value }}
                    >
                        <span className={`text-[10px] sm:text-sm font-black uppercase tracking-widest ${option.label === 'Putih' ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
                            {option.label}
                        </span>
                    </button>
                ))}
            </div>
            {error && (
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{error}</p>
            )}
        </div>
    );
}
