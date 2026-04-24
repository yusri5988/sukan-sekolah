export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'w-5 h-5 rounded-lg border-slate-200 text-orange-600 focus:ring-orange-500/20 transition-all duration-300 cursor-pointer ' +
                className
            }
        />
    );
}
