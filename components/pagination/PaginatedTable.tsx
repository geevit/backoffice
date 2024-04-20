import { DataQuery } from "@geevit/types";
import { PaginatedHeader } from "./PaginatedHeader";
import { PaginatedRow } from "./PaginatedRow";

export interface PaginatedTableProps {
    headers: string[];
    displayHeaders: string[];
    toFixed: string[];
    toDate: string[];
    href: string;
    hrefKey: string;
    dataQuery: DataQuery<any>;
    className?: string;
}

export const PaginatedTable = ({
    headers,
    displayHeaders,
    toFixed,
    toDate,
    href,
    hrefKey,
    dataQuery,
    className,
}: PaginatedTableProps) => {
    return (
        <div
            className={`w-full rounded-2xl overflow-hidden bg-white ${
                className || ""
            }`}>
            <PaginatedHeader headers={displayHeaders} />
            {dataQuery.data.map((row, index) => {
                return (
                    <PaginatedRow
                        key={index}
                        data={row}
                        headers={headers}
                        toFixed={toFixed}
                        toDate={toDate}
                        href={href}
                        hrefKey={hrefKey}
                    />
                );
            })}
            {dataQuery.data.length === 0 && (
                <div className="flex justify-center items-center h-full py-10">
                    <p className="text-leaf/70 font-ro-medium ">
                        Aucun résultat
                    </p>
                </div>
            )}
        </div>
    );
};
