"use client";
import { FC, useState } from "react";
import { Bolt, Menu } from "lucide-react";
import { GeevitLogo } from "../ui/GeevitLogo";
import { NavBarItem } from "./NavBarItem";
import { NavBarList } from "./NavBarList";
import { ConnectedAs } from "./ConnectedAs";

export const Navbar: FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const toggleOpen = () => setOpen(!open);
    
    return (
        <>
            <div className="h-full flex-1 flex-col gap-16 mr-3 hidden md:flex min-w-72">
                <div className="p-6">
                    <GeevitLogo />
                </div>
                <NavBarList />
                <ConnectedAs />
            </div>
            <div className="p-3 flex md:hidden justify-between items-center">
            <div className="p-2">
                    <Menu size={24} color="leaf"/>
                </div>
                <GeevitLogo />
                <div className="p-2 hover:bg-leaf-hover rounded-xl cursor-pointer" onClick={toggleOpen}>
                    <Menu size={24} color="white"/>
                </div>
            </div>
            {
                open && (
                    <div className="p-2 flex md:hidden"><NavBarList center/></div>
                )
            }
        </>
    );
};
