"use client";
import Link from "next/link";

export const GeevitLogo = () => {
    return (
        <Link href="/" className="font-rg-semi-bold text-3xl text-white flex gap-2 cursor-pointer w-fit select-none">
            <img
                src="https://cdn.geev.it/images/leaf.svg"
                className="w-5"
                alt="leaf"
            />
            <span className="pb-2">geevit</span>
        </Link>
    );
};
