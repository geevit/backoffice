"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import {
    CardEntity,
    ShopEntity,
    UserEntity,
} from "@geevit/types";
import { toast } from "sonner";
import {
    CheckIcon,
    CreditCard,
    Euro,
    KeySquare,
    TriangleAlert,
} from "lucide-react";
import { Input } from "../input/Input";
import { useRouter } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export interface NewPhysicalModalProps {
    refreshData: () => void;
    defaultCardNumber?: string;
    disabled?: boolean;
}

export const NewPhysicalModal = ({
    refreshData,
    defaultCardNumber = undefined,
    disabled,
}: NewPhysicalModalProps) => {
    const user = useAuthUser<UserEntity>();
    const [activeShops, setActiveShops] = useState<string[]>([]);
    const [screen, setScreen] = useState<number>(1);
    const router = useRouter();
    const [cardCode, setCardCode] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardEntity>();
    const [error, setError] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [cardExists, setCardExists] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>(
        defaultCardNumber || ""
    );

    const checkIfCardExists = async (cardNumber: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/check-for-creating-physical`
        );
        url.searchParams.append("cardNumber", cardNumber);
        return await fetch(url, config).then(async (res) => {
            const cardExists = await res.json();
            if (res.status !== 200) {
                setCardExists(false);
                setError(
                    "Aucune carte en attente de création trouvée pour ce numéro."
                );
                return;
            } else {
                setCardExists(cardExists);
            }
        });
    };

    const getCard = async (cardNumber: string, cardCode: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/cardNumberSecured`
        );
        url.searchParams.append("cardNumber", cardNumber);
        url.searchParams.append("cardCode", cardCode);
        return await fetch(url, config).then(async (res) => {
            if (res.status === 404) {
                setCardData(undefined);
                setError("Code incorrect.");
                return;
            }
            const data: CardEntity = await res.json();
            setCardData(data);
        });
    };

    const handleChange = async (e: any) => {
        setError("");
        const { value, name } = e.target;
        if (name === "cardNumber") {
            setCardNumber(value);
            if (value.length === 16) {
                checkIfCardExists(value);
            }
            if (value.length !== 16) {
                setCardData(undefined);
                setCardExists(false);
            }
        }

        if (name === "cardCode") {
            setCardCode(value);
            if (value.length === 4) {
                getCard(cardNumber, value);
            }
            if (value.length !== 4) {
                setCardData(undefined);
            }
        }
        if (name === "amount") {
            setAmount(parseFloat(value));
        }
    };

    const handleSubmit = async (e: any) => {
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/activate/physical`
        );
        url.searchParams.append("cardNumber", cardNumber);
        url.searchParams.append("cardCode", cardCode);
        url.searchParams.append("amount", amount.toString());
        for (let i = 0; i < activeShops.length; i++) {
            url.searchParams.append("shopIds", activeShops[i]);
        }
        return await fetch(url, config).then(async (res) => {
            if (res.status === 200) {
                toast.success("Carte créée avec succès.");
                setCardData(undefined);
                setCardExists(false);
                setError("");
                setOpen(false);
                setAmount(0);
                refreshData();
                const card: CardEntity = await res.json();
                router.push(`/cards/${card.cardId}`);
            }
        });
    };

    const handleChangeShop = (shopId: string) => {
        if (activeShops.includes(shopId)) {
            setActiveShops(activeShops.filter((id) => id !== shopId));
        } else {
            setActiveShops([...activeShops, shopId]);
        }
    };

    const handleNextScreen = async (e: any) => {
        e.preventDefault();
        if (cardExists) {
            setScreen(2);
        } else {
            setError("Aucune carte en attente de création trouvée pour ce numéro.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                disabled={disabled}
                onClick={() => {
                    setError("");
                    setScreen(1);
                    setCardExists(false);
                    setCardData(undefined);
                }}
                className="font-ro-semibold text-white bg-leaf flex-1 h-14 flex items-center justify-center rounded-2xl cursor-pointer disabled:cursor-default disabled:bg-leaf/70 hover:bg-leaf-hover transition-all duration-300 ease-in-out">
                Nouvelle carte physique
            </DialogTrigger>
            <DialogContent className="bg-gray">
                <DialogHeader className="text-leaf">
                    <DialogTitle>Nouvelle carte physique</DialogTitle>
                    <DialogDescription className="text-leaf/70">
                        {screen === 1 && "Sélectionnez le type de carte."}
                        {screen === 2 &&
                            "Saisissez les informations de la carte."}
                        {screen === 3 && "Sélectionnez les commerces."}
                    </DialogDescription>
                </DialogHeader>
                {screen === 1 && (
                    <div className="w-full flex flex-col gap-2">
                        <form
                            onSubmit={handleNextScreen}
                            onChange={handleChange}
                            className="flex flex-col gap-4">
                            <Input
                                placeholder="Saisissez le numéro de carte..."
                                Icon={CreditCard}
                                name="cardNumber"
                                defaultValue={defaultCardNumber}
                            />
                            {cardExists && (
                                <Input
                                    placeholder="Code de sécurité (4 chiffres)"
                                    Icon={KeySquare}
                                    name="cardCode"
                                />
                            )}
                            {cardData && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex ">
                                        <div className="flex-1">
                                            <p className="font-ro-bold text-leaf">
                                                Date d'activation
                                            </p>
                                            <p className="font-ro text-leaf">
                                                Aujourd'hui
                                            </p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-ro-bold text-leaf">
                                                Date d'expiration
                                            </p>
                                            <p className="font-ro text-leaf">
                                                {new Date(
                                                    new Date().setFullYear(
                                                        new Date().getFullYear() +
                                                            1
                                                    )
                                                ).toLocaleDateString("fr-FR") ||
                                                    "Inconnu"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Input
                                            placeholder="Montant"
                                            Icon={Euro}
                                            name="amount"
                                        />
                                    </div>
                                    {error && cardData && (
                                        <div className="bg-red-200 px-5 py-3 rounded-xl text-red-900 font-ro-medium flex items-center">
                                            <TriangleAlert className="mr-3 size-4" />
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={
                                            !!error || !cardData || !amount
                                        }
                                        className="h-10 w-full bg-leaf disabled:bg-leaf/70 rounded-xl px-4 text-sm font-ro-semibold text-white focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out">
                                        <p className="text-white font-ro-medium">
                                            Suivant
                                        </p>
                                    </button>
                                </div>
                            )}
                            {error && !cardData && (
                                <div className="bg-red-200 px-5 py-3 rounded-xl text-red-900 font-ro-medium flex items-center">
                                    <TriangleAlert className="mr-3 size-4" />
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                )}
                {screen === 2 && user && (
                    <div className="w-full flex flex-col gap-2">
                        {user.shops.map((shop: ShopEntity) => (
                            <div
                                onClick={() => handleChangeShop(shop.shopId)}
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
                        <button
                            onClick={handleSubmit}
                            disabled={activeShops.length === 0}
                            className=" mt-4 h-10 w-full bg-leaf disabled:bg-leaf/70 rounded-xl px-4 text-sm font-ro-semibold text-white focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out">
                            <p className="text-white font-ro-medium">Valider</p>
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
