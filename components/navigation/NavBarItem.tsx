"use client";
import Link from "next/link";
import React, { FC } from "react";

export interface NavBarButtonProps {
    title: string;
    selected?: boolean;
    Icon?: FC<any>;
    href?: string;
}

export const NavBarItem: FC<NavBarButtonProps> = ({
    title,
    selected = false,
    Icon,
    href = "/",
}: NavBarButtonProps) => {
    return (
        <Link
            href={href}
            passHref
            className="hover:bg-leaf-hover py-2.5 px-6 rounded-lg cursor-pointer flex gap-3 items-center w-full">
            {Icon && (
                <Icon
                    size={22}
                    className={selected ? "text-white" : "text-white/70"}
                />
            )}
            <p
                className={`text-md ${
                    selected
                        ? "text-white font-rg-medium"
                        : "text-white/70 font-rg"
                }`}>
                {title}
            </p>
        </Link>
    );
};
