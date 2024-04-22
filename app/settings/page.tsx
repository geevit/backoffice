"use client";
import { me } from "@geevit/src/lib/utils";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function SettingsPage() {
    const [cookies, setCookies] = useCookies(["Bearer", "connectedUser"]);
    useEffect(() => {
        me(cookies.Bearer).then(({ jwt, me }) => {
            setCookies("connectedUser", JSON.stringify(me), {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
            setCookies("Bearer", jwt, {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
        });
    }, []);
    return <div>SettingsPage</div>;
}
