"use client";
import NextAuth from "@auth-kit/next/NextAuth";
import "@geevit/app/globals.css";
import { UserEntity } from "@geevit/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function DashboardPage() {
    const auth = useAuthUser<UserEntity>();

    return (
        <NextAuth fallbackPath={"/login"}>
            <p>Hello {auth?.firstName} </p>
        </NextAuth>
    );
}
