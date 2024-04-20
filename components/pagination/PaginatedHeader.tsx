export interface PaginatedHeaderProps {
    headers: string[];
}

export const PaginatedHeader = ({ headers }: PaginatedHeaderProps) => {
    return (
        <div className="w-full flex bg-white-hover cursor-pointer sticky">
            {headers.map((header) => {
                return (
                    <div
                        key={header}
                        className="flex items-center w-full py-3.5 border-gray-200 flex-1 ">
                        <p className="font-ro-medium text-leaf text-center w-full text-sm">
                            {header || "N/A"}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
