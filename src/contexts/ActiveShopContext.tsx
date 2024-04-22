import { ShopEntity, UserEntity } from "@geevit/types";
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useCookies } from "react-cookie";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ActiveShopsContext = createContext<{
    activeShops: string[];
    setActiveShops: Dispatch<SetStateAction<string[]>>;
    // getActiveShopIds: () => string[];
    handleChangeShop: (shop: string) => void;
}>(null!);

export function ActiveShopsProvider({ children }: PropsWithChildren<{}>) {
    const user = useAuthUser<UserEntity>();
    const [cookies, setCookies] = useCookies(["shops"]);
    const [activeShops, setActiveShops] = useState<string[]>(
        user?.shops.map((s) => s.shopId) || []
    );
    // const getActiveShopIds = () => activeShops.map((shop) => shop.shopId);

    const handleChangeShop = (shop: string) => {
        if (activeShops.includes(shop)) {
            setActiveShops(activeShops.filter((s) => s !== shop));
            setCookies(
                "shops",
                JSON.stringify(activeShops.filter((s) => s !== shop)),
                {
                    path: "/",
                    sameSite: true,
                    expires: new Date(
                        new Date().getTime() + 60 * 60 * 24 * 1000
                    ),
                }
            );
        } else {
            setActiveShops([...activeShops, shop]);
            setCookies("shops", JSON.stringify([...activeShops, shop]), {
                path: "/",
                sameSite: true,
                expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            });
        }
    };

    // useEffect(() => {
    //     if (cookies.shops) {
    //         const activeShops: string[] = (
    //             Array.from(cookies.shops) as ShopEntity[]
    //         ).map((s: ShopEntity) => s.shopId);
    //         setActiveShops(activeShops);
    //     }
    // }, []);

    // useEffect(() => {
    //     setCookies("shops", JSON.stringify(activeShops), {
    //         path: "/",
    //         sameSite: true,
    //         expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    //     });
    // }, [activeShops]);

    const values = {
        activeShops,
        setActiveShops,
        // getActiveShopIds,
        handleChangeShop,
    };
    return (
        <ActiveShopsContext.Provider value={values}>
            {children}
        </ActiveShopsContext.Provider>
    );
}

export const useActiveShops = () => {
    const context = useContext(ActiveShopsContext);
    if (context === undefined) {
        throw new Error(
            "useActiveShops must be used within a ActiveShopsProvider"
        );
    }
    return context;
};
