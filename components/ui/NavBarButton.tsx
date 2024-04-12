import React, { FC } from "react";

export interface NavBarButtonProps {
    title: string;
    selected?: boolean;
}

export const NavBarButton: FC<NavBarButtonProps> = ({
    title,
    selected = false,
}: NavBarButtonProps) => {
    return (
        <div className="hover:bg-leaf-hover py-2.5 px-6 rounded-lg cursor-pointer flex gap-3 items-center">
            <img
                src={`https://cdn.geev.it/images/${title}.svg`}
                alt="dashboard"
                className="w-6 h-6 text-white"
                style={{ color: "white" }}
            />
            <p
                className={`text-md ${
                    selected
                        ? "text-white font-rg-medium"
                        : "text-white/70 font-rg"
                }`}>
                {title}
            </p>
        </div>
    );
};
