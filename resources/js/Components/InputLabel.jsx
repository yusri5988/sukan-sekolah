export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block font-black uppercase tracking-widest text-[10px] text-slate-900 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
