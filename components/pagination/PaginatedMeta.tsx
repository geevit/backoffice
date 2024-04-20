import { MetaQueryDto } from "@geevit/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginatedMetaProps {
    meta: MetaQueryDto;
    setPage: (page: number) => void;
}

export const PaginatedMeta = ({ meta, setPage }: PaginatedMetaProps) => {
    return (
        <div className="w-full flex justify-end mt-3 items-center gap-6">
            <p className="text-leaf font-ro-semibold text-sm">
                {(meta.page - 1) * meta.take + 1} -{" "}
                {meta.hasNextPage ? meta.page * meta.take : meta.itemsCount} sur{" "}
                {meta.itemsCount}
            </p>
            <div className="flex rounded-xl overflow-hidden select-none">
                <div
                    onClick={() => {
                        if (meta.hasPreviousPage) {
                            setPage(+meta.page - 1);
                        }
                    }}
                    className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                    <ChevronLeft className="text-leaf" />
                </div>
                {!meta.hasNextPage && meta.itemsCount > meta.take * 3 && (
                    <div
                        onClick={() => setPage(+meta.page - 2)}
                        className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                        <p className="text-leaf font-ro-semibold">
                            {+meta.page - 2}
                        </p>
                    </div>
                )}
                {meta.hasPreviousPage && (
                    <div
                        onClick={() => setPage(+meta.page - 1)}
                        className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                        <p className="text-leaf font-ro-semibold">
                            {+meta.page - 1}
                        </p>
                    </div>
                )}

                <div className="bg-leaf h-10 w-8 flex items-center justify-center">
                    <p className="text-white font-ro-semibold">{meta.page}</p>
                </div>
                {meta.hasNextPage && (
                    <div
                        onClick={() => setPage(+meta.page + 1)}
                        className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                        <p className="text-leaf font-ro-semibold">
                            {+meta.page + 1}
                        </p>
                    </div>
                )}
                {!meta.hasPreviousPage &&
                    (meta.page + 2) * meta.take < meta.itemsCount && (
                        <div
                            onClick={() => setPage(+meta.page + 2)}
                            className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                            <p className="text-leaf font-ro-semibold">
                                {+meta.page + 2}
                            </p>
                        </div>
                    )}
                <div
                    onClick={() => {
                        if (meta.hasNextPage) {
                            setPage(+meta.page + 1);
                        }
                    }}
                    className="bg-white h-10 w-8 flex items-center justify-center cursor-pointer hover:bg-white-hover transition-all duration-200 ease-in-out">
                    <ChevronRight className="text-leaf" />
                </div>
            </div>
        </div>
    );
};
