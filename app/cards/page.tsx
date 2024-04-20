"use client";

import { Paginated } from "@geevit/components/pagination/Paginated";
import { FastActionButton } from "@geevit/components/ui/FastActionButton";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { BlocageModal } from "@geevit/src/components/modals/BlocageModal";
import { EncaissementModal } from "@geevit/src/components/modals/EncaissementModal";

import {
    CardEntity,
    CardFilter,
    CardStatusEnum,
    DataQuery,
} from "@geevit/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CardsPage() {
    const [page, setPage] = useState(1);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
    const [cards, setCards] = useState<DataQuery<CardEntity>>();
    const [orderBy, setOrderBy] = useState<string>("expirationDate");
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
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/paginated`
        );
        url.searchParams.append("page", page.toString());
        url.searchParams.append("take", "10");
        url.searchParams.append("orderClause", orderBy);
        url.searchParams.append("orderDirection", "ASC");
        return await fetch(url, config).then(async (res) => {
            const data = await res.json();
            setCards(data);
        });
    };
    useEffect(() => {
        refreshData();
    }, [page, selectedFilter, searchTerm, orderBy]);

    return (
        <div className="flex flex-col gap-6 items-start">
            <PageTitle title="Gestion des cartes" />
            <SectionTitle title="Actions rapides" />
            <div className="w-full flex gap-4">
                <EncaissementModal refreshData={refreshData} disabled={false} />
                <BlocageModal
                    refreshData={refreshData}
                    disabled={false}
                    title="Bloquer une carte"
                />
                <FastActionButton title="Nouvelle carte" />
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
                    setOrderBy={setOrderBy}
                />
            )}
        </div>
    );
}
