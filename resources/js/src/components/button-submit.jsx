export default function ButtonSubmit({ children, ...props }) {
    return (
        <button
            {...props}
            type="submit"
            className="
      bg-black 
        hover:bg-red-500
          h-[40px]
          lg:h-[50px]
          w-full
          rounded-lg
"
        >
            {children}
        </button>
    );
}
