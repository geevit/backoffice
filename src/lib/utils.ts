import { UserEntity } from "@geevit/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export async function me(
    jwt: string
): Promise<{ jwt: string; me: UserEntity }> {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    } as RequestInit;
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
    return await fetch(url, config).then(async (res) => {
        const me = await res.json();
        if (me.statusCode === 401) {
            // redirect to login
            window.location.href = "/login";
            return;
        }
        return me;
    });
}
