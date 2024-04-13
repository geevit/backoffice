"use client";
import { FC } from "react";
import { GeevitLogo, NavBarItem, NavBarList } from "@geevit/components";
import { Bolt } from "lucide-react";

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
