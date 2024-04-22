"use client";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";

import { useAuth } from "@geevit/src/contexts/AuthContext";
import { ShopEntity, SubscriptionEntity, UserEntity } from "@geevit/types";
import { TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function CardPage() {
    const user = useAuthUser<UserEntity>();
    const [open, setOpen] = useState(false);
    const [shop, setShop] = useState<ShopEntity>();
    const [activeShop, setActiveShop] = useState<ShopEntity>();
    const [activeSubscription, setActiveSubscription] =
        useState<SubscriptionEntity>();
    const getShop = async (shopId: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/shop`);
        url.searchParams.append("shopId", shopId);
        return await fetch(url, config).then(async (res) => {
            const shop: ShopEntity = await res.json();
            setShop(shop);
            setActiveSubscription(
                shop.subscriptions.find((subscription) => subscription.isActive)
            );
        });
    };

    const toggleOpen = () => {
        setOpen(!open);
    };

    const toggleSelect = (shop: ShopEntity) => {
        setActiveShop(shop);
        setOpen(false);
    };

    useEffect(() => {
        if (user && user.shops) setActiveShop(user.shops[0]);
    }, []);

    React.useEffect(() => {
        activeShop && getShop(activeShop?.shopId);
    }, [, activeShop]);

    return (
        shop && (
            <div>
                <div className="flex flex-col gap-6 items-start w-full">
                    <div className="flex w-full items-center justify-between">
                        <PageTitle title="Mon commerce" />
                        <div className="relative">
                            <div
                                onClick={toggleOpen}
                                className={`h-10 cursor-pointer bg-white hover:bg-white-hover rounded-xl px-4 flex items-center gap-1 placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out`}>
                                {activeShop?.name || "Selectionner un commerce"}
                            </div>
                            {open && (
                                <div
                                    className={`mt-2 absolute right-0 bg-white shadow rounded-xl flex items-center gap-1 placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out`}>
                                    <div className="flex flex-col p-1">
                                        {user &&
                                            user.shops.map((shop) => (
                                                <div
                                                    key={shop.shopId}
                                                    onClick={() =>
                                                        toggleSelect(shop)
                                                    }
                                                    className="w-full py-2 px-4 whitespace-nowrap hover:bg-white-hover cursor-pointer rounded-lg">
                                                    {shop.name}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <SectionTitle title="Détails" />
                        <div className="flex gap-4 w-full">
                            <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                                <p className="font-ro-semibold text-leaf">
                                    Informations générales
                                </p>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Nom du commerce
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.name || "Inconnu"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Type
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.shopDetails?.shopType ||
                                            "Inconnu"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Gérant
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.user?.firstName || "Inconnu"}{" "}
                                        {shop.user?.lastName || ""}
                                    </p>
                                </div>
                            </div>
                            <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                                <p className="font-ro-semibold text-leaf">
                                    Informations de contact
                                </p>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Adresse
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.address?.street || "Inconnu"}{" "}
                                        {shop.address?.zip || "Inconnu"}{" "}
                                        {shop.address?.city || "Inconnu"} (
                                        {shop.address?.country.slice(0, 2) ||
                                            "Inconnu"}
                                        )
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Téléphone
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.shopDetails?.phone || "Inconnu"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Email
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {shop.shopDetails?.email || "Inconnu"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                                <p className="font-ro-semibold text-leaf">
                                    Forfait
                                </p>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Type de forfait
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {activeSubscription
                                            ? activeSubscription.forfait.name ||
                                              "Inconnu"
                                            : "Aucun"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Membre depuis le
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {activeSubscription
                                            ? new Date(
                                                  activeSubscription.startDate
                                              ).toLocaleDateString() ||
                                              "Inconnu"
                                            : "Aucun"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Engagé jusqu'au
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {activeSubscription
                                            ? new Date(
                                                  activeSubscription.endDate
                                              ).toLocaleDateString() ||
                                              "Inconnu"
                                            : "Pas d'abonnement"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full ">
                        <SectionTitle title="Cartes" />
                        <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                            <div className="flex flex-col">
                                <p className="font-ro-medium text-leaf">
                                    Cartes
                                </p>
                                <p className="font-ro-semibold text-leaf">
                                    {shop.cards.length || 0}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-ro-medium text-leaf">
                                    Cartes vendues
                                </p>
                                <p className="font-ro-semibold text-leaf">
                                    {
                                        shop.cards.filter(
                                            (card) =>
                                                card.cardStatus !==
                                                    "WAITING_FOR_PRINT" &&
                                                card.cardStatus !==
                                                    "IN_DELIVERY" &&
                                                card.cardStatus !== "CREATED"
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-ro-medium text-leaf">
                                    Cartes vierges restantes
                                </p>
                                <p className="font-ro-semibold text-leaf">
                                    {
                                        shop.cards.filter(
                                            (card) =>
                                                card.cardStatus === "CREATED"
                                        ).length
                                    }
                                </p>
                            </div>
                            {activeSubscription &&
                                activeSubscription.receivingAutomaticly && (
                                    <div className="flex flex-col">
                                        <p className="font-ro-medium text-leaf">
                                            Prochaine livraison automatique
                                        </p>
                                        <p className="font-ro-semibold text-leaf">
                                            {new Date().getDate() <
                                            activeSubscription.receivingDay
                                                ? new Date(
                                                      new Date().getFullYear(),
                                                      new Date().getMonth(),
                                                      activeSubscription.receivingDay
                                                  ).toLocaleDateString()
                                                : new Date(
                                                      new Date().getFullYear(),
                                                      new Date().getMonth() + 1,
                                                      activeSubscription.receivingDay
                                                  ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            <div className="bg-yellow px-5 py-3 rounded-xl text-yellow-dark font-ro-medium flex items-center w-full gap-2">
                                <TriangleAlert className="mr-3 size-6" />
                                <div className="flex flex-col">
                                    <span>
                                        Il vous reste peu de cartes vierges
                                        disponibles.
                                    </span>
                                    <span className="underline font-ro-semibold cursor-pointer">
                                        Commander des cartes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
