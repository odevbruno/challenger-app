export default function ContentList({ children }) {
    return (
        <div className="flex flex-col gap-2 pb-4  w-full overflow-y-scroll ">
            {children}
        </div>
    );
}
