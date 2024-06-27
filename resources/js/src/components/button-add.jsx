export default function ButtonAdd({ ...props }) {
    return (
        <button
            {...props}
            className="
        bg-black 
          hover:bg-red-500
            h-[40px]
            w-[40px] 
            lg:h-[50px] 
            lg:w-[50px]
            rounded-lg
  "
        >
            <span>+</span>
        </button>
    );
}
