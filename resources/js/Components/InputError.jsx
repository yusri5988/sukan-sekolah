export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-[11px] font-medium text-red-500 ml-1 mt-1 ' + className}
        >
            {message}
        </p>
    ) : null;
}
