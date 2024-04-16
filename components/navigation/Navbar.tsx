"use client";
import { FC } from "react";
import { Bolt } from "lucide-react";
import { GeevitLogo } from "../ui/GeevitLogo";
import { NavBarItem } from "./NavBarItem";
import { NavBarList } from "./NavBarList";

export const Navbar: FC = () => {
    return (
        <div className="h-full flex-1 flex flex-col gap-16 mr-3">
            <div className="p-6">
                <GeevitLogo />
            </div>
            <NavBarList />
            <NavBarItem title="Réglages" Icon={Bolt} />
        </div>
    );
};
