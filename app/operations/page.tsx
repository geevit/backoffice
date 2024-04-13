"use client";

import { PageTitle, SectionTitle } from "@geevit/components";
import { Paginated } from "@geevit/components/pagination/Paginated";
import { FastActionButton } from "@geevit/components/ui/FastActionButton";
import {
    DataQuery,
    OperationEntity,
    OperationFilter,
    OperationTypeEnum,
} from "@geevit/types";
import { useEffect, useState } from "react";

export default function CardsPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
    const [operations, setOperations] = useState<DataQuery<OperationEntity>>();
    const refreshData = async () => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const body = {} as OperationFilter;
        if (selectedFilter !== "ALL") {
            body.operationType = [selectedFilter as OperationTypeEnum];
        }
        if (searchTerm !== "") {
            body.cardNumber = searchTerm;
        }
        config.body = JSON.stringify(body);
        return await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/operation/paginated?page=${page}&take=10&orderClause=operationDate&orderDirection=ASC`,
            config
        ).then(async (res) => {
            const data: DataQuery<OperationEntity> = await res.json();
            setOperations({
                ...data,
                data: data.data.map((operation: OperationEntity) => {
                    return {
                        ...operation,
                        cardNumber: operation.card.cardNumber,
                    };
                }),
            });
        });
    };
    useEffect(() => {
        refreshData();
    }, [page, selectedFilter, searchTerm]);
    return (
        <div className="flex flex-col gap-6 items-start">
            <PageTitle title="Mes opérations" />
            <SectionTitle title="Actions rapides" />
            <div className="w-full flex gap-4">
                <FastActionButton title="Encaissement" />
                <FastActionButton title="Nouvelle carte" />
                <FastActionButton title="Bloquer une carte" />
                <FastActionButton title="Réception de cartes" />
            </div>
            <SectionTitle title="Opérations" />
            {operations && (
                <Paginated
                    dataQuery={operations}
                    displayHeaders={[
                        "Date de l'opération",
                        "Numéro de carte",
                        "Type d'opération",
                        "Montant",
                        "Solde avant op.",
                        "Solde après op.",
                    ]}
                    headers={[
                        "operationDate",
                        "cardNumber",
                        "operationType",
                        "amount",
                        "balanceBeforeOperation",
                        "balanceAfterOperation",
                    ]}
                    setPage={setPage}
                    toFixed={[
                        "amount",
                        "balanceBeforeOperation",
                        "balanceAfterOperation",
                    ]}
                    toDate={["operationDate"]}
                    href="/operations/"
                    hrefKey="operationId"
                    filters={{
                        Toutes: "ALL",
                        Activations: "ACTIVATION",
                        Encaissements: "ENCAISSEMENT",
                        Blocage: "BLOCAGE",
                        Création: "CREATION",
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
