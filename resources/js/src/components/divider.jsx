export default function Divider(props) {
    return (
        <div
            className={`w-full h-[0.6px] bg-zinc-600 shadow-inner ${props.className}`}
        />
    );
}
