export default function ItemList({ children, ...props }) {
    return (
        <div
            {...props}
            className="py-5 w-full bg-zinc-700 flex items-center justify-start px-4 rounded-md hover:cursor-pointer hover:bg-zinc-600"
        >
            {children}
        </div>
    );
}
