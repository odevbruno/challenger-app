import React, { useState } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed w-full h-full inset-0 bg-black bg-opacity-50 flex items-start pt-[10%] justify-center z-50 text-zinc-50">
            <div className="bg-zinc-800 p-6 rounded shadow-2xl relative w-[80%] lg:w-[500px]">
                <div
                    onClick={(ev) => {
                        ev.stopPropagation();
                        onClose();
                    }}
                    className=" flex flex-row items-center justify-between"
                >
                    <span>{title}</span>
                    <button
                        onClick={onClose}
                        className=" text-zinc-200 hover:text-zinc-50"
                    >
                        &times;
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
