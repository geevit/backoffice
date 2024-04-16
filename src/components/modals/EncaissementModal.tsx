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
import { Input } from "../input/Input";
import { CardEntity } from "@geevit/types";
import {
    Ban,
    CircleX,
    Euro,
    KeySquare,
    Search,
    TriangleAlert,
} from "lucide-react";
export const EncaissementModal = () => {
    const [cardData, setCardData] = useState<CardEntity>();
    const [error, setError] = useState<string>("");

    const getCard = async (cardNumber: string) => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/cardNumber`
        );
        url.searchParams.append("cardNumber", cardNumber);
        return await fetch(url, config).then(async (res) => {
            if (res.status === 404) {
                setCardData(undefined);
                setError("Aucune carte trouvée.");
                return;
            }
            const data: CardEntity = await res.json();
            setCardData(data);
        });
    };

    const handleChange = (e: any) => {
        setError("");
        const value = e.target.value;
        if (value.length === 16) {
            getCard(value);
        }
        if (value.length !== 16) {
            setCardData(undefined);
        }
    };

    return (
        <Dialog>
            <DialogTrigger
                onClick={() => setCardData(undefined)}
                className="font-ro-semibold text-white bg-leaf flex-1 h-14 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-leaf-hover transition-all duration-300 ease-in-out">
                Encaissement
            </DialogTrigger>
            <DialogContent className="bg-gray">
                <DialogHeader className="text-leaf">
                    <DialogTitle>Encaissement</DialogTitle>
                    <DialogDescription className="text-leaf/70">
                        Encaissez un montant sur une carte
                    </DialogDescription>
                </DialogHeader>
                <form onChange={handleChange}>
                    <Input
                        placeholder="Rechercher un numéro..."
                        Icon={Search}
                    />
                </form>
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
                                    Montant disponible
                                </p>
                                <p className="font-ro text-leaf">
                                    {cardData.currentBalance.toFixed(2)} €
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Input placeholder="Montant" Icon={Euro} />
                            <Input
                                placeholder="Code de sécurité (4 chiffres)"
                                Icon={KeySquare}
                            />
                        </div>

                        <button className="h-10 w-full bg-leaf rounded-xl px-4 text-sm font-ro-semibold text-white focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out">
                            <p className="text-white font-ro-medium">
                                Encaisser 10€
                            </p>
                        </button>
                    </div>
                )}
                {error && (
                    <div className="bg-red-200 px-5 py-3 rounded-xl text-red-900 font-ro-medium flex items-center">
                        <TriangleAlert className="mr-3 size-4" />
                        {error}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
