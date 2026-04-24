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
                `block font-semibold text-xs text-slate-500 mb-2 ml-1 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
