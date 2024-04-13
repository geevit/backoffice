import { Search } from "lucide-react";
import React from "react";

export interface PaginatedSearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export const PaginatedSearchBar = ({
    searchTerm,
    setSearchTerm,
}: PaginatedSearchBarProps) => {
    return (
        <div className="relative">
            <input
                type="text"
                className="h-10 w-80 bg-white rounded-xl px-4 pl-10 placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder="Rechercher un numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3 text-leaf size-4" />
        </div>
    );
};
