"use client";
import { useAuth } from "@geevit/src/contexts/AuthContext";
export default function () {
    const { logout } = useAuth();
    logout();
}
