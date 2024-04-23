"use client";
import { useRouter } from "next/navigation";
import useSignOut from "react-auth-kit/hooks/useSignOut";
export default function () {
    const router = useRouter();
    useSignOut()();
    router.push("/login");
}
