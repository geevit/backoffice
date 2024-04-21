"use client";
import { Input } from "@geevit/src/components/input/Input";
import { ShopEntity } from "@geevit/types";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function () {
    // get jwt cookie
    const [cookies, setCookies] = useCookies([
        "Bearer",
        "connectedUser",
        "selectedShops",
    ]);
    const me = async (jwt: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
        return await fetch(url, config).then(async (res) => {
            const me = await res.json();
            console.log(me);
            if (me.me) {
                setCookies("connectedUser", JSON.stringify(me.me), {
                    path: "/",
                    sameSite: true,
                    expires: new Date(
                        new Date().getTime() + 60 * 60 * 24 * 1000
                    ),
                });
            }
            if (me.me.shops) {
                setCookies(
                    "selectedShops",
                    me.me.shops.map((shop: ShopEntity) => shop.shopId),
                    {
                        path: "/",
                        sameSite: true,
                        expires: new Date(
                            new Date().getTime() + 60 * 60 * 24 * 1000
                        ),
                    }
                );
            }
            window.location.href = "/";
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            email: form.get("email"),
            password: form.get("password"),
        };
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
        return await fetch(url, config).then(async (res) => {
            const login = await res.json();
            if (!login.jwt) {
                alert(login);
            } else {
                setCookies("Bearer", login.jwt, {
                    path: "/",
                    sameSite: true,
                    expires: new Date(
                        new Date().getTime() + 60 * 60 * 24 * 1000
                    ),
                });
                me(login.jwt);

                // window.location.href = "/";
            }
        });
    };

    return (
        <div>
            Connection
            <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
                <Input name="email" placeholder="jhon@doe.com" />
                <Input name="password" placeholder="password" />
                <button
                    type="submit"
                    className="p-2 rounded-xl bg-leaf font-ro-medium text-white text-sm">
                    Submit
                </button>
            </form>
        </div>
    );
}
