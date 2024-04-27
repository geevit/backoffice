"use client";
import { FC } from "react";
import { Bolt } from "lucide-react";
import { GeevitLogo } from "../ui/GeevitLogo";
import { NavBarItem } from "./NavBarItem";
import { NavBarList } from "./NavBarList";
import { ConnectedAs } from "./ConnectedAs";

export const Navbar: FC = () => {
    return (
        <>
            <div className="h-full flex-1 flex-col gap-16 mr-3 hidden md:flex">
                <div className="p-6">
                    <GeevitLogo />
                </div>
                <NavBarList />
                <ConnectedAs />
            </div>
            <div className="p-3 flex md:hidden justify-center">
                <GeevitLogo />
            </div>
        </>
    );
};
