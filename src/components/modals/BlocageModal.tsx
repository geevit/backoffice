"use client";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "../input/Input";
import { CardEntity } from "@geevit/types";
import { Euro, KeySquare, Search, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export interface BlocageModalProps {
    refreshData: () => void;
    defaultCardNumber?: string;
    disabled?: boolean;
    title?: string;
}

export const BlocageModal = ({
    refreshData,
    defaultCardNumber = undefined,
    disabled,
    title,
}: BlocageModalProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardEntity>();
    const [error, setError] = useState<string>("");
    const [cardExists, setCardExists] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>(
        defaultCardNumber || ""
    );
    const [cardCode, setCardCode] = useState<string>("");

    const checkIfCardExists = async (cardNumber: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/cardExists`
        );
        url.searchParams.append("cardNumber", cardNumber);
        return await fetch(url, config).then(async (res) => {
            const cardExists = await res.json();
            setCardExists(cardExists);
            if (!cardExists) {
                setError("Aucune carte trouvée.");
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
            if (data.cardStatus === "BLOCKED") {
                setCardData(undefined);
                setError("La carte est déjà bloquée.");
                return;
            }
            setCardData(data);
        });
    };

    const submitBlock = async (e: any) => {
        e.preventDefault();
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/card/block`);
        url.searchParams.append("cardNumber", cardNumber);
        url.searchParams.append("cardCode", cardCode);
        return await fetch(url, config).then(async (res) => {
            if (res.status === 200) {
                toast.success(`Carte bloquée avec succès.`);
                setCardData(undefined);
                setCardExists(false);
                setError("");
                setOpen(false);
                refreshData();
            }
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
    };

    if (defaultCardNumber) {
        checkIfCardExists(defaultCardNumber);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                disabled={disabled}
                onClick={() => {
                    setCardData(undefined);
                    setCardExists(false);
                    setError("");
                }}
                className="font-ro-semibold text-white bg-bordeaux disabled:bg-bordeaux/70 disabled:cursor-default flex-1 h-14 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-bordeaux-hover transition-all duration-300 ease-in-out">
                {title ? title : "Bloquer la carte"}
            </DialogTrigger>
            <DialogContent className="bg-gray">
                <DialogHeader className="text-leaf">
                    <DialogTitle>Blocage {cardExists}</DialogTitle>

                    <DialogDescription className="text-leaf/70">
                        {title ? title : "Bloquer la carte"}
                    </DialogDescription>
                </DialogHeader>
                <form
                    onChange={handleChange}
                    className="flex flex-col gap-4"
                    onSubmit={submitBlock}>
                    <Input
                        placeholder="Rechercher un numéro..."
                        Icon={Search}
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
                                        Propriétaire
                                    </p>
                                    <p className="font-ro text-leaf">
                                        {cardData.cardSend?.receiverName ||
                                            "Inconnu"}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-ro-bold text-leaf">
                                        Montant restant
                                    </p>
                                    <p className="font-ro text-leaf">
                                        {cardData.currentBalance?.toFixed(2) ||
                                            "0,00"}{" "}
                                        €
                                    </p>
                                </div>
                            </div>
                            {cardData.currentBalance > 0 && (
                                <div className="bg-red-200 px-5 py-3 rounded-xl text-red-900 font-ro-medium flex items-center">
                                    <TriangleAlert className="mr-3 size-4" />
                                    Attention, cette carte contient du solde et
                                    son blocage est irréversible.
                                    <br />
                                </div>
                            )}
                            {error && cardData && (
                                <div className="bg-red-200 px-5 py-3 rounded-xl text-red-900 font-ro-medium flex items-center">
                                    <TriangleAlert className="mr-3 size-4" />
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="h-10 w-full bg-bordeaux  hover:bg-bordeaux-hover rounded-xl px-4 text-sm font-ro-semibold text-white focus:outline-none focus:ring-1 focus:ring-bordeaux focus:border-transparent transition-all duration-200 ease-in-out">
                                <p className="text-white font-ro-medium">
                                    Bloquer la carte
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
            </DialogContent>
        </Dialog>
    );
};
