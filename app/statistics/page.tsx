"use client";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Head from "next/head";
import { useActiveShops } from "@geevit/src/contexts/ActiveShopContext";
import { SelectShopSheet } from "@geevit/src/components/sheets/SelectShopSheet";

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

    const { activeShops } = useActiveShops();

    const authHeader = useAuthHeader();

    const refresh = async () => {
        if (activeShops.length === 0) return;
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/statistics`);
        activeShops.forEach((as) => {
            url.searchParams.append("shopIds", as);
        });
        url.searchParams.append("range", "YEAR");
        return await fetch(url, config).then(async (res) => {
            const data = await res.json();
            setStatistics(data);
        });
    };
    useEffect(() => {
        refresh();
    }, [activeShops]);

    /**
     * TODO:
     * - Choix de la période
     * - Classement des shops
     * - Modal ajouter une carte
     * - Modal commande de carte
     */

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
                <PageTitle title="Statistiques" />

                <SelectShopSheet />
            </div>
            <SectionTitle title="Statistiques générales" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 ">
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.soldCardsCount}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">Cartes vendues</h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.totalAmountSold.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes vendues
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.expiredCardsCount}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">Cartes expirées</h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.totalAmountExpired.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes expirées
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.totalActualCards}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Cartes en cirulation
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.totalActualAmount.toFixed(2)} €
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Montant total des cartes en cirulation
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
                        {statistics?.totalActualCards}
                    </h3>
                    <h1 className="font-ro-bold text-leaf">
                        Paiements encaissés
                    </h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1">
                    <h3 className="font-ro-heavy text-leaf text-3xl">
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
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1 h-72">
                    <h3 className="font-ro-heavy text-leaf text-3xl">2e</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1 h-80">
                    <h3 className="font-ro-heavy text-leaf text-3xl">1er</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
                <div className="bg-white rounded-2xl p-6 flex flex-col justify-end flex-1 gap-1 h-60">
                    <h3 className="font-ro-heavy text-leaf text-3xl">3e</h3>
                    <h1 className="font-ro-bold text-leaf">Nom du shop</h1>
                </div>
            </div>
        </div>
    );
}
