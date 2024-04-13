import { DataQuery, OperationEntity } from "@geevit/types";
import React, { useState } from "react";

export interface SalesContentProps {
    operationsDataQuery: DataQuery<OperationEntity>;
}

export const SalesContent = ({ operationsDataQuery }: SalesContentProps) => {
    const [operations, setOperations] =
        useState<DataQuery<OperationEntity>>(operationsDataQuery);
    return <div>{JSON.stringify(operations)}</div>;
};
