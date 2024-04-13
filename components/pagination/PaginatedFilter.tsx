import React from "react";
import { PaginatedFilterElement } from "./PaginatedFilterElement";

export interface PaginatedFilterProps {
    filters: Record<string, string>;
    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
}

export const PaginatedFilter = ({
    filters,
    selectedFilter = "Toutes",
    setSelectedFilter,
}: PaginatedFilterProps) => {
    return (
        <div className="flex gap-2">
            {Object.keys(filters).map((filter) => (
                <PaginatedFilterElement
                    key={filter}
                    filter={filter}
                    filterName={filters[filter]}
                    setSelectedFilter={setSelectedFilter}
                    selectedFilter={selectedFilter}
                />
            ))}
        </div>
    );
};
