"use client";
import { PaginatedTable } from "@geevit/components/pagination/PaginatedTable";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { BlocageModal } from "@geevit/src/components/modals/BlocageModal";
import { EncaissementModal } from "@geevit/src/components/modals/EncaissementModal";
import { CardEntity } from "@geevit/types";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function CardPage() {
    const cardId = useParams().cardId;
    const [card, setCard] = useState<CardEntity>();
    const getCard = async (cardId: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/card/cardId`);
        url.searchParams.append("cardId", cardId);
        return await fetch(url, config).then(async (res) => {
            const card: CardEntity = await res.json();
            setCard(card);
        });
    };

    React.useEffect(() => {
        getCard(Array.isArray(cardId) ? cardId[0] : cardId);
    }, [cardId]);
    return (
        card && (
            <div>
                <div className="flex flex-col gap-6 items-start w-full">
                    <PageTitle title={`Carte ${card?.cardNumber ?? ""}`} />
                    <div className="flex flex-col gap-3 w-full">
                        <SectionTitle title="Actions rapides" />
                        <div className="flex gap-4 w-full">
                            <EncaissementModal
                                refreshData={() => {
                                    getCard(card.cardId);
                                }}
                                defaultCardNumber={card.cardNumber}
                                disabled={
                                    card.cardStatus !== "ACTIVE" ||
                                    card.currentBalance === 0
                                }
                            />
                            <BlocageModal
                                refreshData={() => {
                                    getCard(card.cardId);
                                }}
                                defaultCardNumber={card.cardNumber}
                                disabled={card.cardStatus === "BLOCKED"}
                            />
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
                                        Numéro de carte
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {card?.cardNumber}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        État
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {card?.cardStatus}
                                    </p>
                                </div>
                            </div>
                            <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                                <p className="font-ro-semibold text-leaf">
                                    Échéances
                                </p>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Date d'activation
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {new Date(
                                            card?.activationDate
                                        ).toLocaleDateString() ?? "Inconnue"}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Date d'expiration
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {new Date(
                                            card?.expirationDate
                                        ).toLocaleDateString() ?? "Inconnue"}
                                    </p>
                                </div>
                            </div>{" "}
                            <div className="flex bg-white flex-1 rounded-2xl flex-col items-start p-5 gap-4">
                                <p className="font-ro-semibold text-leaf">
                                    Informations financières
                                </p>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Solde initial
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {card?.initialBalance?.toFixed(2) ??
                                            "0,00"}{" "}
                                        €
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-ro-medium text-leaf">
                                        Solde actuel
                                    </p>
                                    <p className="font-ro-semibold text-leaf">
                                        {card?.currentBalance?.toFixed(2) ??
                                            "0,00"}{" "}
                                        €
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full ">
                        <SectionTitle title="Opérations" />
                        <PaginatedTable
                            displayHeaders={[
                                "Opération",
                                "Montant",
                                "Solde avant op.",
                                "Solde après op.",
                                "Date",
                            ]}
                            headers={[
                                "operationType",
                                "amount",
                                "balanceBeforeOperation",
                                "balanceAfterOperation",
                                "operationDate",
                            ]}
                            toDate={["operationDate"]}
                            toFixed={[
                                "amount",
                                "balanceBeforeOperation",
                                "balanceAfterOperation",
                            ]}
                            hrefKey="operationId"
                            href="/operations/"
                            dataQuery={{
                                data: card?.operations,
                                meta: {
                                    page: 1,
                                    take: 100,
                                    hasNextPage: false,
                                    hasPreviousPage: false,
                                    itemsCount: card?.operations?.length ?? 0,
                                    pageCount: 1,
                                },
                            }}
                            className="max-h-[25rem] overflow-y-auto "
                        />
                    </div>
                </div>
            </div>
        )
    );
}
