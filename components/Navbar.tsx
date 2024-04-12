import { FC } from "react";
import { GeevitLogo } from "@geevit/components/ui/GeevitLogo";
import { NavBarButton } from "./ui/NavBarButton";

export const Navbar: FC = () => {
    return (
        <div className="h-full flex-1 flex flex-col gap-16 mr-5">
            <div className="p-6">
                <GeevitLogo />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <NavBarButton title="Dashboard" selected />
                <NavBarButton title="Statistiques" />
                <NavBarButton title="Mes ventes" />
                <NavBarButton title="Mes cartes" />
                <NavBarButton title="Mon commerce" />
                <NavBarButton title="Mon profil" />
            </div>
            <NavBarButton title="Réglages" />
        </div>
    );
};
