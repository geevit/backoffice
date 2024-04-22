"use client";
import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShopEntity, UserEntity } from "@geevit/types";
import { CheckIcon } from "lucide-react";
import { useActiveShops } from "@geevit/src/contexts/ActiveShopContext";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const SelectShopSheet = () => {
    const { activeShops, handleChangeShop } = useActiveShops();
    const user = useAuthUser<UserEntity>();

    return (
        <>
            {user && user.shops ? (
                <Sheet>
                    <SheetTrigger
                        className={`h-10  bg-white hover:bg-white-hover rounded-xl px-4 flex items-center gap-1 placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out`}>
                        <span className="text-leaf">
                            {activeShops.length === 1 &&
                                user.shops.find(
                                    (s) => s.shopId === activeShops[0]
                                )?.name}
                            {activeShops.length > 1 &&
                                `${activeShops.length} commerces actifs`}
                            {activeShops.length === 0 &&
                                "Selectionner un commerce"}
                        </span>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="mb-8">
                            <SheetTitle className="text-leaf font-ro-semibold">
                                Sélectionnez le(s) commerce(s) actif(s)
                            </SheetTitle>
                            <SheetDescription className="text-leaf font-ro-medium">
                                Sélectionnez les commerces pour lesquels vous
                                souhaitez afficher, ajouter ou modifier des
                                données.{" "}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col gap-2">
                            {user.shops.map((shop: ShopEntity) => (
                                <div
                                    onClick={() =>
                                        handleChangeShop(shop.shopId)
                                    }
                                    key={shop.shopId}
                                    className={`flex items-center justify-between gap-2 h-12 px-4 cursor-pointer rounded-xl font-ro-medium ${
                                        activeShops.includes(shop.shopId)
                                            ? "bg-leaf text-white hover:bg-leaf-hover"
                                            : "bg-white hover:bg-white-hover"
                                    }`}>
                                    <span>{shop.name}</span>
                                    {activeShops.includes(shop.shopId) && (
                                        <CheckIcon className="size-4" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            ) : (
                <> </>
            )}
        </>
    );
};
