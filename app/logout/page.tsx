"use client";
import { useCookies } from "react-cookie";

export default function () {
    // get jwt cookie
    const [cookies, setCookies] = useCookies([
        "Bearer",
        "connectedUser",
        "selectedShops",
    ]);
    if (!cookies.Bearer) {
        window.location.href = "/login";
        return;
    } else {
        setCookies("Bearer", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        setCookies("connectedUser", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        setCookies("selectedShops", "", {
            path: "/",
            sameSite: true,
            expires: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        });
        window.location.href = "/login";

        return;
    }
}
