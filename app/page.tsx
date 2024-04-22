"use client";
import "@geevit/app/globals.css";
import { UserEntity } from "@geevit/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function DashboardPage() {
    const auth = useAuthUser<UserEntity>();

    return <p>Hello {auth?.firstName} </p>;
}
