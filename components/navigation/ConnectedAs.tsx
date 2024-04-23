import { UserEntity } from "@geevit/types";
import {
    BadgeCheck,
    Bolt,
    CheckCircle,
    ChevronDown,
    LogOut,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export const ConnectedAs = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const user = useAuthUser<UserEntity>();

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={` mx-2 flex flex-col gap-4 items-center justify-center cursor-pointer rounded-xl py-2 px-2 m-2 ${
                isOpen ? "bg-leaf-hover" : "bg-leaf"
            }  `}>
            {isOpen && (
                <div className="flex flex-col w-full">
                    <Link
                        href="/profile"
                        className="flex gap-4 items-center w-full group hover:bg-leaf-dark p-2.5 px-4 rounded-lg ">
                        <User
                            size={22}
                            className="group-hover:text-white text-white/70"
                        />
                        <h1 className="font-ro-medium group-hover:text-white text-white/70">
                            Mon profil
                        </h1>
                    </Link>
                    <Link
                        href="/logout"
                        className="flex gap-4 items-center w-full group hover:bg-leaf-dark p-2.5 px-4 rounded-lg">
                        <LogOut
                            size={22}
                            className="group-hover:text-white text-white/70"
                        />
                        <h1 className="font-ro-medium group-hover:text-white text-white/70">
                            Déconnexion
                        </h1>
                    </Link>
                </div>
            )}
            <div className="flex justify-between items-center w-full px-2">
                <div className="flex items-center gap-2">
                    <Image
                        src={"https://cdn.geev.it/images/admin_pp.png"}
                        width={32}
                        height={32}
                        className="rounded-full"
                        alt="profile_picture"
                    />
                    <div className="flex flex-col">
                        <h1 className="font-ro-semibold text-white text-sm flex items-center gap-1">
                            {user?.firstName} {user?.lastName}
                            {user?.email === "me@baptisthecht.fr" && (
                                <BadgeCheck
                                    size={16}
                                    stroke="#114232"
                                    fill="white"
                                />
                            )}
                        </h1>
                        <h2 className="font-ro-medium text-white text-sm">
                            {user?.email}
                        </h2>
                    </div>
                </div>
                <ChevronDown
                    size={20}
                    className={`text-white ${
                        isOpen ? "rotate-180" : ""
                    } transition-all duration-200 ease-in-out`}
                />
            </div>
        </div>
    );
};
