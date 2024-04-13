"use client";

export interface PaginatedFilterElementProps {
    filter: string;
    selectedFilter: string;
    filterName: string;
    setSelectedFilter: (filter: string) => void;
}

export const PaginatedFilterElement = ({
    filter,
    selectedFilter,
    filterName,
    setSelectedFilter,
}: PaginatedFilterElementProps) => {
    return (
        <div
            onClick={() => {
                setSelectedFilter(filterName);
            }}
            className={`px-4 py-2 mb-3 rounded-xl select-none ${
                filterName === selectedFilter
                    ? "bg-white"
                    : "hover:bg-white-hover transition-all duration-200 ease-in-out cursor-pointer"
            }`}>
            <p className="text-leaf font-ro-semibold text-sm">{filter}</p>
        </div>
    );
};
