"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export interface NavBarButtonProps {
    title: string;
    Icon?: FC<any>;
    href?: string;
    activePage?: string;
    setActivePage: (activePage: string) => void;
}

export const NavBarItem: FC<NavBarButtonProps> = ({
    title,
    Icon,
    href = "/",
}: NavBarButtonProps) => {
    const pathname = usePathname();
    return (
        <Link
            onClick={() => {}}
            href={href}
            className="hover:bg-leaf-hover py-2.5 px-6 rounded-lg cursor-pointer flex gap-3 items-center w-full">
            {Icon && (
                <Icon
                    size={22}
                    className={
                        pathname === href ? "text-white" : "text-white/70"
                    }
                />
            )}
            <p
                className={`text-md ${
                    pathname === href
                        ? "text-white font-rg-medium"
                        : "text-white/70 font-rg"
                }`}>
                {title}
            </p>
        </Link>
    );
};
