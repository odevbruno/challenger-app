import { GripVertical } from "lucide-react";
import { forwardRef } from "react";

const ItemList = forwardRef(({ children, ...props }, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            className="py-5 w-full bg-zinc-700 flex items-center justify-start px-4 rounded-md hover:cursor-pointer hover:bg-zinc-600"
        >
            {children}
        </div>
    );
});

export default ItemList;
