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
    GenerateVirtualCardDto,
    ShopEntity,
    UserEntity,
} from "@geevit/types";
import { toast } from "sonner";
import {
    Calendar,
    CalendarDays,
    CheckIcon,
    CloudCog,
    CreditCard,
    Euro,
    Gift,
    KeySquare,
    Mail,
    MessageSquare,
    Phone,
    TriangleAlert,
    User2,
} from "lucide-react";
import { Input } from "../input/Input";
import { useRouter } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export interface NewVirtualModalProps {
    refreshData: () => void;
    defaultCardNumber?: string;
    disabled?: boolean;
}

export const NewVirtualModal = ({
    refreshData,
    defaultCardNumber = undefined,
    disabled,
}: NewVirtualModalProps) => {
    const [configureNow, setConfigureNow] = useState<boolean>(true);
    const user = useAuthUser<UserEntity>();
    const [activeShops, setActiveShops] = useState<string[]>([]);
    const [screen, setScreen] = useState<number>(1);
    const router = useRouter();
    const [cardType, setCardType] = useState<"PHYSICAL" | "VIRTUAL" | "">("");
    const [cardCode, setCardCode] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [cardData, setCardData] = useState<CardEntity>();
    const [error, setError] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [cardExists, setCardExists] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>(
        defaultCardNumber || ""
    );
    const [body, setBody] = useState<Partial<GenerateVirtualCardDto>>();

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
            if (res.status === 400) {
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

    const handlePhysicalSubmit = async (e: any) => {
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

    const handleSubmit = async (e: any) => {
      
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...body,
                shopIds: activeShops,
            }),
        } as RequestInit;
        const url = new URL(
            `${process.env.NEXT_PUBLIC_API_URL}/card/generate/virtual`
        );
        return await fetch(url, config).then(async (res) => {
            if (res.status === 201) {
                toast.success("Carte créée avec succès.");
                setCardData(undefined);
                setCardExists(false);
                setError("");
                setOpen(false);
                setAmount(0);
                refreshData();
            }
        });
    };

    const setType = (type: "PHYSICAL" | "VIRTUAL") => {
        setCardType(type);
        setScreen(2);
    };

    const handleScreen2PhysicalSubmit = async (e: any) => {
        e.preventDefault();
        setScreen(3);
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const { amount, senderEmail, senderName, receiverName, receiverEmail, receiverPhone } = e.target;
        if (!amount.value) {
            setError("Veuillez renseigner le montant.");
            return;
        }
        let body: Partial<GenerateVirtualCardDto> = { }
        if (!configureNow) {
            if (!senderEmail.value) {
                setError("Veuillez renseigner l'email du client.");
                return;
            }
            body = ({
                 configureNow: false,
                amount: parseFloat(amount.value),
                senderName: "TODO SET EMAIL",
            });
        } else {
            if (!senderName.value) {
                setError("Veuillez renseigner le nom du client.");
                return;
            }
            if (!receiverName.value) {
                setError("Veuillez renseigner le nom du destinataire.");
                return;
            }
            if(!receiverEmail.value && !receiverPhone.value) {
                setError("Veuillez renseigner l'email ou le téléphone du destinataire.");
                return;
            }
            body = ({
                configureNow: true,
                amount: parseFloat(amount.value),
                senderName: senderName.value,
                receiverName: receiverName.value,
                sendEmail: receiverEmail.value,
                sendPhone: receiverPhone.value,
                customMessage: e.target.message.value,
                sendDate:  new Date().toISOString() as unknown as Date,
            });
        }
        body.immediateSend = !body.sendDate && configureNow;
        setBody(body);
        setScreen(2);
    }

    const handleChangeShop = (shopId: string) => {
        if (activeShops.includes(shopId)) {
            setActiveShops(activeShops.filter((id) => id !== shopId));
        } else {
            setActiveShops([...activeShops, shopId]);
        }
    };

    const toggleSwitchChange = () => {
        if (!configureNow) {
            setConfigureNow(true);
        } else {
            setConfigureNow(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                disabled={disabled}
                onClick={() => {
                    setError("");
                    setCardType("");
                    setScreen(1);
                    setCardExists(false);
                    setCardData(undefined);
                }}
                className="font-ro-semibold text-white bg-leaf flex-1 h-14 flex items-center justify-center rounded-2xl cursor-pointer disabled:cursor-default disabled:bg-leaf/70 hover:bg-leaf-hover transition-all duration-300 ease-in-out">
                Nouvelle carte virtuelle
            </DialogTrigger>
            <DialogContent className="bg-gray">
                <DialogHeader className="text-leaf">
                    <DialogTitle>Nouvelle carte virtuelle</DialogTitle>
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
                            onSubmit={handleFormSubmit}
                            onChange={handleChange}
                            className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4 ">
                                <div className="flex flex-col gap-2 ">
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
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={configureNow}
                                        id="configure-now"
                                        onClick={toggleSwitchChange}
                                    />
                                    <Label htmlFor="configure-now">
                                        {configureNow
                                            ? "Configurer l'envoi maintenant"
                                            : "Laisser le client configurer"}
                                    </Label>
                                </div>
                                {!configureNow && (
                                    <div className="flex flex-col gap-2">
                                        <Label>Email du client</Label>
                                        <Input
                                            placeholder="louis.dup@email.com"
                                            Icon={Mail}
                                            name="senderEmail"
                                        />
                                    </div>
                                )}
                                {configureNow && (
                                    <div className="flex flex-col gap-2">
                                        <Label>Nom du client (offrant)</Label>
                                        <Input
                                            placeholder="Lucas Dupont"
                                            Icon={User2}
                                            name="senderName"
                                        />
                                        <Label>Nom du destinataire</Label>
                                        <Input
                                            placeholder="Louis Dupont"
                                            Icon={Gift}
                                            name="receiverName"
                                        />
                                        <Label>
                                            Email du destinataire{" "}
                                            <span className="ml-1 text-leaf/70">
                                                (facultatif si le tel. est
                                                renseigné)
                                            </span>
                                        </Label>
                                        <Input
                                            placeholder="louis.dup@email.com"
                                            Icon={Mail}
                                            name="receiverEmail"
                                        />

                                        <Label>
                                            Téléphone du destinataire{" "}
                                            <span className="ml-1 text-leaf/70">
                                                (facultatif si l'email est
                                                renseigné)
                                            </span>
                                        </Label>
                                        <Input
                                            placeholder="06 12 34 56 78"
                                            Icon={Phone}
                                            name="receiverPhone"
                                        />
                                        <Label>Message personnalisé</Label>
                                        <Input
                                            placeholder="Joyeux anniversaire ! 🎉"
                                            Icon={MessageSquare}
                                            name="message"
                                        />
                                        <Label>Date d'envoi</Label>
                                        <Input
                                            placeholder={new Date()
                                                .toLocaleDateString()
                                                .replace(/\//g, "-")}
                                            Icon={Calendar}
                                            name="sendDate"
                                            optionnal
                                        />
                                    </div>
                                )}
                                {configureNow && (
                                    <div className="flex ">
                                        <div className="flex-1">
                                            <p className="font-ro-bold text-leaf">
                                                Date d'envoi (activation)
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
                                )}
                                <button
                                    type="submit"
                                    disabled={!!error || !amount}
                                    className="h-10 w-full bg-leaf disabled:bg-leaf/70 rounded-xl px-4 text-sm font-ro-semibold text-white focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out">
                                    <p className="text-white font-ro-medium">
                                        Suivant
                                    </p>
                                </button>
                            </div>
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
