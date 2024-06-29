export default function Page({ children }) {
    return (
        // overflow-y-scroll lg:overflow-y-hidden
        <div className="bg-zinc-800 h-[95%] w-[90%] lg:w-[550px] rounded-md p-4 px-6 text-zinc-50 flex flex-col ">
            {children}
        </div>
    );
}
