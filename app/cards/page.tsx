"use client";

import { Paginated } from "@geevit/components/pagination/Paginated";
import { FastActionButton } from "@geevit/components/ui/FastActionButton";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import {
    CardEntity,
    CardFilter,
    CardStatusEnum,
    DataQuery,
} from "@geevit/types";
import { useEffect, useState } from "react";

export default function CardsPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
    const [cards, setCards] = useState<DataQuery<CardEntity>>();
    const refreshData = async () => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const body = {} as CardFilter;
        if (selectedFilter !== "ALL") {
            body.cardStatus = selectedFilter as CardStatusEnum;
        }
        if (searchTerm !== "") {
            body.cardNumber = searchTerm;
        }
        config.body = JSON.stringify(body);
        return await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/card/paginated?page=${page}&take=10&orderClause=cardNumber&orderDirection=ASC`,
            config
        ).then(async (res) => {
            const data = await res.json();
            setCards(data);
        });
    };
    useEffect(() => {
        refreshData();
    }, [page, selectedFilter, searchTerm]);
    return (
        <div className="flex flex-col gap-6 items-start">
            <PageTitle title="Gestion des cartes" />
            <SectionTitle title="Actions rapides" />
            <div className="w-full flex gap-4">
                <FastActionButton title="Encaissement" />
                <FastActionButton title="Nouvelle carte" />
                <FastActionButton title="Bloquer une carte" />
                <FastActionButton title="Réception de cartes" />
            </div>
            <SectionTitle title="Cartes" />
            {cards && (
                <Paginated
                    dataQuery={cards}
                    displayHeaders={[
                        "Numéro de carte",
                        "Statut",
                        "Type",
                        "Montant actuel",
                        "Montant initial",
                        "Date de commande",
                        "Expiration",
                    ]}
                    headers={[
                        "cardNumber",
                        "cardStatus",
                        "cardType",
                        "currentBalance",
                        "initialBalance",
                        "orderDate",
                        "expirationDate",
                    ]}
                    setPage={setPage}
                    toFixed={["currentBalance", "initialBalance"]}
                    toDate={["orderDate", "expirationDate"]}
                    href="/cards/"
                    hrefKey="cardId"
                    filters={{
                        Toutes: "ALL",
                        Actives: "ACTIVE",
                        Bloquées: "BLOCKED",
                        Vierges: "CREATED",
                        Terminées: "EMPTY",
                        "Expirent bientôt": "SOON_EXPIRING",
                    }}
                    setSelectedFilter={setSelectedFilter}
                    selectedFilter={selectedFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            )}
        </div>
    );
}
