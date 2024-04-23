import { SectionTitle } from "@geevit/components/ui/SectionTitle";
import React, { PropsWithChildren } from "react";

export interface SettingCardProps extends PropsWithChildren<{}> {
    data: { title?: string; description: string }[];
    title: string;
}

export const SettingCard = ({ data, title, children }: SettingCardProps) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionTitle title={title} />
            <div className="bg-white rounded-2xl p-5 w-full flex flex-col gap-4">
                {data.map((item, index) => (
                    <div className="flex flex-col gap-1">
                        <h2 className="font-ro-semibold text-leaf text-sm">
                            {item.title}
                        </h2>
                        <p className="font-ro-medium text-leaf text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
                {children}
            </div>
        </div>
    );
};
