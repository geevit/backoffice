"use client";

import { DataQuery, OperationEntity } from "@geevit/types";
import { useEffect, useState } from "react";

export default function SalesPage() {
    const [operations, setOperations] = useState<DataQuery<OperationEntity>>();
    const refreshData = async () => {
        return await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/operation/paginated?page=1&take=10&orderClause=amount&orderDirection=ASC`,
            {
                method: "POST",
                // BEARER
                headers: {
                    // Authorization: `Bearer ${await localStorage.getItem(
                    //     "jwt"
                    // )}`,
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            const data = await res.json();
            setOperations(data);
        });
    };
    useEffect(() => {
        refreshData();
    }, []);
    return (
        <div>
            {operations?.data.map((operation) => (
                <div key={operation.operationId}>
                    {" "}
                    total : {operation.amount} <br />
                    date : {new Date(
                        operation.operationDate
                    ).toDateString()}{" "}
                    <br />
                    type : {operation.operationType} <br />
                    card : {operation.card.cardNumber} <br />
                    <br />
                    <br />
                </div>
            ))}
            <button onClick={() => refreshData()}>test</button>
        </div>
    );
}
