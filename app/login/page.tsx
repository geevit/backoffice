"use client";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function () {
    // get jwt cookie
    const [cookies, setCookies] = useCookies(["Bearer", "connectedUser"]);
    const me = async () => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.Bearer}`,
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
        return await fetch(url, config).then(async (res) => {
            const me = await res.json();
            if (!me.statusCode || me.statusCode !== 401) {
                window.location.href = "/";
            }
        });
    };

    useEffect(() => {
        me();
    }, []);

    return <div>page </div>;
}
