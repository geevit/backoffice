import { DataQuery } from "@geevit/types";
import { PaginatedTable } from "./PaginatedTable";
import { PaginatedMeta } from "./PaginatedMeta";
import { PaginatedFilter } from "./PaginatedFilter";
import { PaginatedSearchBar } from "./PaginatedSearchBar";

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
}: PaginatedProps) => {
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <PaginatedFilter
                    filters={filters}
                    setSelectedFilter={setSelectedFilter}
                    selectedFilter={selectedFilter}
                />
                <PaginatedSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <PaginatedTable
                headers={headers}
                displayHeaders={displayHeaders}
                dataQuery={dataQuery}
                toFixed={toFixed}
                toDate={toDate}
                href={href}
                hrefKey={hrefKey}
            />
            <PaginatedMeta meta={dataQuery.meta} setPage={setPage} />
        </div>
    );
};
