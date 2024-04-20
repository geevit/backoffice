"use client";

import { Paginated } from "@geevit/components/pagination/Paginated";
import { FastActionButton } from "@geevit/components/ui/FastActionButton";
import { PageTitle } from "@geevit/components/ui/PageTitle";
import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import { SelectShopSheet } from "@geevit/src/components/sheets/SelectShopSheet";
import { me } from "@geevit/src/lib/utils";
import {
    DataQuery,
    OperationEntity,
    OperationFilter,
    OperationTypeEnum,
    ShopEntity,
    UserEntity,
} from "@geevit/types";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function CardsPage() {
    const [cookies, setCookies] = useCookies([
        "Bearer",
        "connectedUser",
        "selectedShops",
    ]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
    const [operations, setOperations] = useState<DataQuery<OperationEntity>>();
    const refreshData = async () => {
        await me(cookies.Bearer).then(({ jwt, me }) => {
            setCookies("connectedUser", JSON.stringify(me), {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
            setCookies("Bearer", jwt, {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
            // setCookies(
            //     "selectedShops",
            //     me.shops.map((shop: ShopEntity) => shop.shopId),
            //     {
            //         path: "/",
            //         sameSite: true,
            //         expires: new Date(
            //             new Date().getTime() + 60 * 60 * 24 * 1000
            //         ),
            //     }
            // );
        });
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
            <div className="flex justify-between items-center w-full">
                <PageTitle title="Mes opérations" />

                <SelectShopSheet />
            </div>
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
                    setOrderBy={() => {}}
                />
            )}
        </div>
    );
}
