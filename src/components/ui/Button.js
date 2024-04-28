export default function Button(props) {
    return (
        <button 
            className={`bg-gradient-to-r from-rose-600 to-sky-500 text-white p-2 pr-3 pl-3 rounded-md hover:scale-110 transition-all duration-500 ease-in-out disabled:from-slate-700 disabled:to-slate-500 disabled:cursor-not-allowed font-bold flex flex-row items-center ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
            onKeyPress={props.onKeyPress}
        >
            {props.children}
        </button>
    );
}
