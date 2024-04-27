"use client";
import { Input } from "@geevit/src/components/input/Input";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function () {
    const router = useRouter();
    const [validToken, setValidToken] = React.useState();
    const [error, setError] = React.useState("");
    const { token } = useParams();
    const checkToken = async () => {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password-exists`
        );
        const useToken = Array.isArray(token) ? token[0] : token;
        url.searchParams.append("token", useToken);
        return await fetch(url).then(async (res) => {
            const response = await res.json();
            setValidToken(response);
        });
    };

    const handleSubmit = async (e: any) => {
        setError("");
        e.preventDefault();
        const form = new FormData(e.target);
        const password = form.get("new-password");
        const passwordConfirm = form.get("new-password-confirm");
        if (typeof password !== "string" || typeof passwordConfirm !== "string")
            return;
        if (password !== passwordConfirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`
        );
        const useToken = Array.isArray(token) ? token[0] : token;
        url.searchParams.append("token", useToken);
        url.searchParams.append("password", password);
        return await fetch(url, config).then(async (res) => {
            const response = await res.json();
            if (response.success) {
                toast.success("Votre mot de passe a été modifié avec succès.");
                router.push("/login");
            } else setError("Une erreur est survenue. Veuillez réessayer.");
        });
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <>
            {validToken ? (
                <div className="flex flex-col gap-4 items-center">
                    <h1 className="font-ro-semibold text-leaf">
                        Reinitialisez votre mot de passe
                    </h1>
                    <form
                        className="flex flex-col w-full gap-4"
                        onSubmit={handleSubmit}>
                        <Input
                            name="new-password"
                            placeholder="Nouveau mot de passe"
                        />
                        <Input
                            name="new-password-confirm"
                            placeholder="Confirmez le mot de passe"
                        />
                        <button
                            type="submit"
                            className="p-2 rounded-xl bg-leaf font-ro-medium text-white text-sm hover:bg-leaf-hover transition duration-200 ease-in-out">
                            Confirmer
                        </button>
                    </form>
                </div>
            ) : validToken === false ? (
                <p className="text-leaf font-ro-semibold">
                    Erreur, votre lien est invalide ou a expiré.
                </p>
            ) : (
                <p className="text-leaf font-ro-semibold">Chargement...</p>
            )}
        </>
    );
}
