import Link from "next/link";
import React from "react";

export interface PaginatedRowProps {
    data: {};
    headers: string[];
    toFixed: string[];
    toDate: string[];
    hrefKey: string;
    href: string;
}

export const PaginatedRow = ({
    data,
    headers,
    toFixed,
    toDate,
    href,
    hrefKey,
}: PaginatedRowProps) => {
    const locationOnClick: string = data[hrefKey as keyof typeof data];
    return (
        <Link
            className="w-full flex bg-white hover:bg-white-hover cursor-pointer"
            href={href + locationOnClick}>
            {headers.map((header) => {
                return (
                    <div
                        key={header}
                        className="flex items-center w-full py-3.5 border-gray-200 flex-1 ">
                        <p className="font-ro-medium text-leaf text-center w-full text-sm">
                            {toFixed.includes(header)
                                ? Number(
                                      data[header as keyof typeof data]
                                  ).toFixed(2) + " €"
                                : toDate.includes(header)
                                ? new Date(
                                      data[header as keyof typeof data]
                                  ).toLocaleDateString()
                                : data[header as keyof typeof data] || "N/A"}
                        </p>
                    </div>
                );
            })}
        </Link>
    );
};
