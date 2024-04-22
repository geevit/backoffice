import { DataQuery } from "@geevit/types";
import { PaginatedTable } from "./PaginatedTable";
import { PaginatedMeta } from "./PaginatedMeta";
import { PaginatedFilter } from "./PaginatedFilter";
import { PaginatedSearchBar } from "./PaginatedSearchBar";
import { PaginatedOrder } from "./PaginatedOrder";

export interface PaginatedProps {
    headers: string[];
    displayHeaders: string[];
    dataQuery: DataQuery<any>;
    toFixed: string[];
    toDate: string[];
    href: string;
    hrefKey: string;
    selectedFilter: string;
    filters: {};
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    setPage: (page: number) => void;
    setSelectedFilter: (filter: string) => void;
    setOrderBy: (orderBy: string) => void;
    noActiveShop?: boolean;
}

export const Paginated = ({
    headers,
    displayHeaders,
    dataQuery,
    toFixed,
    toDate,
    href,
    hrefKey,
    setPage,
    filters,
    setSelectedFilter,
    selectedFilter,
    searchTerm,
    setSearchTerm,
    setOrderBy,
    noActiveShop,
}: PaginatedProps) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-start">
                <PaginatedFilter
                    filters={filters}
                    setSelectedFilter={setSelectedFilter}
                    selectedFilter={selectedFilter}
                />
                <div className="flex items-center gap-2">
                    <PaginatedSearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <PaginatedOrder
                        values={{
                            Date: "expirationDate",
                            "Numéro de carte": "cardNumber",
                            "Solde restant": "currentBalance",
                        }}
                        setOrderBy={setOrderBy}
                    />
                </div>
            </div>
            <PaginatedTable
                headers={headers}
                displayHeaders={displayHeaders}
                dataQuery={dataQuery}
                toFixed={toFixed}
                toDate={toDate}
                href={href}
                hrefKey={hrefKey}
                noActiveShop={noActiveShop}
            />
            {!noActiveShop && (
                <PaginatedMeta meta={dataQuery.meta} setPage={setPage} />
            )}
        </div>
    );
};
