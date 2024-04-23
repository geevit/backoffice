"use client";
import {
    BarChart2,
    Bolt,
    CreditCard,
    LayoutDashboard,
    Percent,
    Store,
    UserRound,
} from "lucide-react";
import { NavBarItem } from "./NavBarItem";

export const NavBarList = () => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <NavBarItem title="Dashboard" Icon={LayoutDashboard} />
            <NavBarItem
                title="Statistiques"
                Icon={BarChart2}
                href="/statistics"
            />
            <NavBarItem
                title="Mes opérations"
                Icon={Percent}
                href="/operations"
            />
            <NavBarItem title="Mes cartes" Icon={CreditCard} href="/cards" />
            <NavBarItem title="Mon commerce" Icon={Store} href="/shop" />
            <NavBarItem title="Réglages" Icon={Bolt} href="/settings" />
        </div>
    );
};
