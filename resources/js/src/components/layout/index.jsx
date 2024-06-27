import { HardHat, PersonStanding, Server } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBarItem({ children, ...props }) {
    return (
        <div
            {...props}
            className="w-full h-[60px] active:bg-zinc-600 hover:bg-zinc-600 lg:justify-center lg:items-start flex flex-col items-center justify-center lg:px-6 p-2 text-zinc-50 "
        >
            {children}
        </div>
    );
}

function SideBar() {
    const history = useNavigate();

    function handlePath(path) {
        history(path);
    }

    return (
        <aside className="flex flex-col w-[60px] lg:w-[20%] text-lg bg-zinc-800 hover:cursor-pointer ">
            <SideBarItem onClick={() => handlePath("/setores")}>
                <span className="hidden lg:flex">Setores</span>
                <Server className="flex lg:hidden" fontSize={15} />
            </SideBarItem>

            <SideBarItem onClick={() => handlePath("/cargos")}>
                <span className="hidden lg:flex">Cargos</span>
                <HardHat className="flex lg:hidden" fontSize={15} />
            </SideBarItem>

            <SideBarItem onClick={() => handlePath("/funcionarios")}>
                <span className="hidden lg:flex">Funcionários</span>
                <PersonStanding className="flex lg:hidden" fontSize={15} />
            </SideBarItem>
        </aside>
    );
}

export default function Layout({ children }) {
    return (
        <section className="h-[100vh] w-full flex bg-zinc-950 ">
            <SideBar />
            <main className="flex w-full items-start pt-[5%]  justify-center">
                {children}
            </main>
        </section>
    );
}
