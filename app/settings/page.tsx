"use client";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SettingCard } from "@geevit/src/components/ui/settingCard";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

export default function SettingsPage() {
    const authHeader = useAuthHeader();

    const handleResetPassword = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader as string,
            },
        }).then(() => {
            toast.success(
                "Un email vous a été envoyé pour modifier votre mot de passe."
            );
        });
    };

    return (
        <div className="flex flex-col gap-6 items-start  overflow-x-hidden overflow-scroll">
            <PageTitle title="Réglages" />
            <SettingCard
                title="Mot de passe"
                data={[
                    {
                        title: "Mot de passe",
                        description:
                            "Vous pouvez modifier votre mot de passe à tout moment en cliquant sur le bouton ci-dessous. Vous recevrez un email contenant les instructions.",
                    },
                ]}>
                <button
                    onClick={handleResetPassword}
                    className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                    Modifier mon mot de passe
                </button>
            </SettingCard>
            <SettingCard
                title="Authentification à deux facteurs"
                data={[
                    {
                        title: "Authentification à deux facteurs",
                        description: "Activée pour le 0614716071",
                    },
                ]}>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            toast.success(
                                "Bientôt disponible, restez connecté !"
                            )
                        }
                        className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                        Modifier le numéro
                    </button>
                    <button
                        onClick={() =>
                            toast.success(
                                "Bientôt disponible, restez connecté !"
                            )
                        }
                        className="bg-rouge w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-white font-ro-semibold hover:bg-rouge-hover transition-all duration-200 ease-in-out">
                        Désactiver
                    </button>
                </div>
            </SettingCard>
            <SettingCard
                title="Forfait"
                data={[
                    {
                        title: "Mon forfait",
                        description: "Forfait Gold",
                    },
                    {
                        title: "Moyen de paiement",
                        description: "Carte ···· 4458",
                    },
                    {
                        title: "Date de prélèvement",
                        description: "Le 2 de chaque mois",
                    },
                ]}>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            toast.success(
                                "Bientôt disponible, restez connecté !"
                            )
                        }
                        className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                        Modifier le moyen de paiement
                    </button>
                    <button
                        onClick={() =>
                            toast.success(
                                "Bientôt disponible, restez connecté !"
                            )
                        }
                        className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                        Modifier la date du prélèvement
                    </button>
                </div>
            </SettingCard>
            <SettingCard
                title="Cartes"
                data={[
                    {
                        title: "Réception automatique des cartes",
                        description: "Activée",
                    },
                    {
                        title: "Date de réception des cartes",
                        description: "Le 5 de chaque mois",
                    },
                ]}>
                <button
                    onClick={() =>
                        toast.success("Bientôt disponible, restez connecté !")
                    }
                    className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                    Modifier la récecption automatique
                </button>
            </SettingCard>
            <SettingCard
                title="Langue"
                data={[
                    {
                        title: "Langue de l'application",
                        description: "Français (France)",
                    },
                ]}>
                <button
                    onClick={() =>
                        toast.success("Bientôt disponible, restez connecté !")
                    }
                    className="bg-stone w-min whitespace-nowrap px-4 py-2 rounded-xl text-sm text-leaf font-ro-semibold hover:bg-gray transition-all duration-200 ease-in-out">
                    Changer de langue
                </button>
            </SettingCard>
        </div>
    );
}
