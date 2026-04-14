export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-md border-4 border-slate-900 text-orange-600 shadow-sm focus:ring-orange-600 transition-all ' +
                className
            }
        />
    );
}
