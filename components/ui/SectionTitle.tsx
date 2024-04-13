import React from "react";

export interface SectionTitleProps {
    title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
    return <div className="font-rg-bold text-xl text-leaf">{title}</div>;
};
