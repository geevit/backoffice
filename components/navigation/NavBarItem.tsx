"use client";
import { useActivePageStore } from "@geevit/store/activePage.store";
import Link from "next/link";
import { FC } from "react";

export interface NavBarButtonProps {
    title: string;
    Icon?: FC<any>;
    href?: string;
}

export const NavBarItem: FC<NavBarButtonProps> = ({
    title,
    Icon,
    href = "/",
}: NavBarButtonProps) => {
    const { activePage, setActivePage } = useActivePageStore();
    return (
        <Link
            onClick={() => setActivePage(title)}
            href={href}
            passHref
            className="hover:bg-leaf-hover py-2.5 px-6 rounded-lg cursor-pointer flex gap-3 items-center w-full">
            {Icon && (
                <Icon
                    size={22}
                    className={
                        activePage === title ? "text-white" : "text-white/70"
                    }
                />
            )}
            <p
                className={`text-md ${
                    activePage === title
                        ? "text-white font-rg-medium"
                        : "text-white/70 font-rg"
                }`}>
                {title}
            </p>
        </Link>
    );
};
