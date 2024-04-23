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
        </NextAuth>
    );
}
