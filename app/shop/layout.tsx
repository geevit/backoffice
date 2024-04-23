"use client";
import NextAuth from "@auth-kit/next/NextAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <NextAuth fallbackPath={"/login"}>{children}</NextAuth>;
}
