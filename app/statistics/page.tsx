"use client";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Head from "next/head";

export default function ProfilePage() {
    const [statistics, setStatistics] = useState<{
        soldCardsCount: number;
        totalAmountSold: number;
        expiredCardsCount: number;
        totalAmountExpired: number;
        totalActualAmount: number;
        totalActualCards: number;
        salesAmountOfShopOne: number;
        salesAmountOfShopTwo: number;
        salesAmountOfShopThree: number;
    }>();

    const authHeader = useAuthHeader();

    const refresh = async () => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/statistics`);
        url.searchParams.append(
            "shopIds",
            "5e4d5166-d09d-491f-b588-d1ce510876f6"
        );
        url.searchParams.append("range", "YEAR");
        return await fetch(url, config).then(async (res) => {
            const data = await res.json();
            setStatistics(data);
        });
    };
    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Statistiques" />
            <SectionTitle title="Statistiques générales" />
            <div className="grid grid-cols-4 w-full gap-4 ">
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.soldCardsCount}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">Cartes vendues</h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.totalAmountSold.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes vendues
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.expiredCardsCount}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">Cartes expirées</h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.totalAmountExpired.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes expirées
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.totalActualCards}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Cartes en cirulation
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.totalActualAmount.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes en cirulation
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        {statistics?.totalActualCards}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Paiements encaissés
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-5xl">
                        10.00 €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Total des encaissements
                    </h1>
                </div>
            </div>
            <SectionTitle title="Classement de mes commerces" />
            <div className="h-4"></div>
            <div className="flex gap-4 items-end">
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1 h-72">
                    <h3 className="font-ro-heavy text-leaf text-5xl">2e</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1 h-80">
                    <h3 className="font-ro-heavy text-leaf text-5xl">1er</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col justify-end flex-1 gap-1 h-60">
                    <h3 className="font-ro-heavy text-leaf text-5xl">3e</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
            </div>
        </div>
    );
}
