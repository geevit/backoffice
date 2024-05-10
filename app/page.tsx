"use client";
import NextAuth from "@auth-kit/next/NextAuth";
import "@geevit/app/globals.css";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { UserEntity } from "@geevit/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function DashboardPage() {
    const auth = useAuthUser<UserEntity>();

    return (
        <NextAuth fallbackPath={"/login"}>
            <PageTitle title={`Bonjour, ${auth?.firstName} ! 👋`}></PageTitle>
            <div className="h-2"></div>
            <SectionTitle title="Quoi de neuf pour aujourd'hui ?" />
            <div className="bg-white p-6 rounded-2xl mt-4 w-content flex flex-col">
                <span className="font-ro-semibold text-leaf">TODO :</span>
                <span className="font-ro-semibold text-leaf">- Fix activeShop context not persisting</span>
                <span className="font-ro-semibold text-leaf">- Fix bad sizes in selector and "Jour"</span>
            </div>
        </NextAuth>
    );
}
