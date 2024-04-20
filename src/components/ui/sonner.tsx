"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group  rounded-xl toast group-[.toaster]:bg-background group-[.toaster]:text-leaf group-[.toaster]:border-gray group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-leaf",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-leaf",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-leaf",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
