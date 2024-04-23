"use client";
import { Input } from "@geevit/src/components/input/Input";
import React from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useRouter } from "next/navigation";

export default function () {
    const signIn = useSignIn();
    const router = useRouter();
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
                if (
                    signIn({
                        auth: {
                            token: login.jwt,
                            type: "Bearer",
                        },
                        userState: login.user,
                    })
                ) {
                    router.push("/");
                } else {
                }
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="font-ro-semibold text-leaf">Connectez-vous !</h1>
            <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}>
                <Input name="email" placeholder="jhon@doe.com" />
                <Input name="password" placeholder="password" />
                <button
                    type="submit"
                    className="p-2 rounded-xl bg-leaf font-ro-medium text-white text-sm hover:bg-leaf-hover transition duration-200 ease-in-out">
                    Connexion
                </button>
            </form>
        </div>
    );
}
