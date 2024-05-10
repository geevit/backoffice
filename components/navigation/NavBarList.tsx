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

export interface NavBarListProps {
    center?: boolean;
}

export const NavBarList = ({center = false}: NavBarListProps) => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <NavBarItem title="Dashboard" Icon={LayoutDashboard} center={center}/>
            <NavBarItem
                title="Statistiques"
                Icon={BarChart2}
                href="/statistics"
                center={center}
            />
            <NavBarItem
                title="Mes opérations"
                Icon={Percent}
                href="/operations"
                center={center}
            />
            <NavBarItem title="Mes cartes" Icon={CreditCard} href="/cards" center={center}/>
            <NavBarItem title="Mon commerce" Icon={Store} href="/shop" center={center}/>
            <NavBarItem title="Réglages" Icon={Bolt} href="/settings" center={center}/>
        </div>
    );
};
