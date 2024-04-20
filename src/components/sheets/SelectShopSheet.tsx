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
import { useCookies } from "react-cookie";
import { ShopEntity } from "@geevit/types";
import { CheckIcon } from "lucide-react";

export const SelectShopSheet = () => {
    const [cookies, setCookies] = useCookies([
        "Bearer",
        "connectedUser",
        "selectedShops",
    ]);
    const [selectedShops, setSelectedShops] = useState<ShopEntity[]>([]);
    const [userShops, setUserShops] = useState<ShopEntity[]>([]);

    useEffect(() => {
        setCookies(
            "selectedShops",
            selectedShops.map((s) => s.shopId),
            {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            }
        );
    }, [selectedShops]);

    useEffect(() => {
        setSelectedShops(
            cookies.connectedUser?.shops.filter((shop: ShopEntity) =>
                cookies.selectedShops.includes(shop.shopId)
            )
        );
        setUserShops(cookies.connectedUser?.shops);
    }, []);

    const handleChangeShop = (ShopEntity: ShopEntity) => {
        if (selectedShops.includes(ShopEntity)) {
            setSelectedShops(selectedShops.filter((s) => s !== ShopEntity));
        } else {
            setSelectedShops([...selectedShops, ShopEntity]);
        }
    };

    return (
        <Sheet>
            <SheetTrigger
                className={`h-10  bg-white hover:bg-white-hover rounded-xl px-4 flex items-center gap-1 placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out`}>
                <span className="text-leaf">
                    {selectedShops.length === 1 && selectedShops[0].name}
                    {selectedShops.length > 1 &&
                        `${selectedShops.length} commerces actifs`}
                    {selectedShops.length === 0 && "Selectionner un commerce"}
                </span>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-leaf font-ro-semibold">
                        Sélectionnez le(s) commerce(s) actif(s)
                    </SheetTitle>
                    <SheetDescription className="text-leaf font-ro-medium">
                        Sélectionnez les commerces pour lesquels vous souhaitez
                        afficher, ajouter ou modifier des données.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                    {userShops.map((shop: ShopEntity) => (
                        // <div
                        //     key={shop.shopId}
                        //     className="flex items-center gap-2 h-12 px-4 bg-white hover:bg-white-hover cursor-pointer rounded-xl">
                        //     <input
                        //         type="checkbox"
                        //         className="h-4 w-4"
                        //         checked={
                        //             cookies.selectedShops &&
                        //             Array.from(cookies.selectedShops).includes(
                        //                 shop.shopId
                        //             )
                        //         }
                        //         onChange={(e) => {
                        //             if (e.target.checked) {
                        //                 setSelectedShops([...selectedShops, shop]);
                        //             } else {
                        //                 setSelectedShops(
                        //                     selectedShops.filter(
                        //                         (selectedShop: ShopEntity) =>
                        //                             selectedShop.shopId !==
                        //                             shop.shopId
                        //                     )
                        //                 );
                        //             }
                        //         }}
                        //     />
                        //     <span className="text-leaf font-ro-medium">
                        //         {shop.name}
                        //     </span>
                        // </div>
                        <div
                            onClick={() => handleChangeShop(shop)}
                            key={shop.shopId}
                            className={`flex items-center justify-between gap-2 h-12 px-4 cursor-pointer rounded-xl font-ro-medium ${
                                selectedShops.includes(shop)
                                    ? "bg-leaf text-white hover:bg-leaf-hover"
                                    : "bg-white hover:bg-white-hover"
                            }`}>
                            <span>{shop.name}</span>
                            {selectedShops.includes(shop) && (
                                <CheckIcon className="size-4" />
                            )}
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
