export default function TextArea(props) {
    return (
        <textarea 
            ref={props.ref}
            className={`inset-0 rounded-md text-slate-50 resize-none outline-none p-1 z-20 bg-slate-800 m-[2px] ${props.className}`}
            placeholder={props.placeholder}
            rows={props.rows ? props.rows : 1}
            onChange={props.onChange}
            value={props.value}
            onKeyPress={props.onKeyPress}
        ></textarea>
    );
}
