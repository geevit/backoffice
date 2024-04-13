import React from "react";

export interface FastActionButtonProps {
    title: string;
}

export const FastActionButton = ({ title }: FastActionButtonProps) => {
    return (
        <div className="bg-leaf flex-1 h-14 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-leaf-hover transition-all duration-300 ease-in-out">
            <p className="font-ro-semibold  text-white">{title}</p>
        </div>
    );
};
