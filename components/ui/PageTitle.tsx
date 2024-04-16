import React from "react";

export interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return <h1 className="font-rg-bold text-3xl text-leaf">{title}</h1>;
};
