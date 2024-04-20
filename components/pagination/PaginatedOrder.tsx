import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface PaginatedOrderProps {
    values: Record<string, string>;
    setOrderBy: (orderBy: string) => void;
}

export const PaginatedOrder = ({ values, setOrderBy }: PaginatedOrderProps) => {
    return (
        <>
            {/* <p className="whitespace-nowrap font-ro-semibold text-leaf -mr-2">
                Trier par
            </p> */}
            <Select
                onValueChange={(s) => setOrderBy(s)}
                defaultValue="expirationDate">
                <SelectTrigger>
                    <SelectValue
                        placeholder="Trier par"
                        aria-label="Trier par"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Trier par</SelectLabel>
                        {Object.entries(values).map(([key, value]) => (
                            <SelectItem value={value}>{key}</SelectItem>
                        ))}
                        {/* {values.map((value) => (
                        <SelectItem value={value[0]}>{value[1]}</SelectItem>
                    ))} */}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>

        // <div className="h-10 bg-leaf rounded-xl px-4 flex items-center cursor-pointer hover:bg-leaf-hover transition ease-in-out duration-200">
        //     <p className="text-sm font-ro-semibold text-white">Trier par</p>
        // </div>
    );
};
