import React from "react";

interface InputProps {
    placeholder?: string;
    Icon?: React.FC<any>;
    name?: string;
    defaultValue?: string;
}

export const Input = ({
    placeholder = "",
    Icon,
    name = "null",
    defaultValue = "",
}: InputProps) => {
    return (
        <div className="relative">
            <input
                type="text"
                className={`h-10 w-full bg-white rounded-xl px-4  placeholder-leaf/70 text-sm font-ro-semibold text-leaf  focus:outline-none focus:ring-1 focus:ring-leaf focus:border-transparent transition-all duration-200 ease-in-out ${
                    Icon && "pl-10"
                }`}
                placeholder={placeholder || "Rechercher un numéro..."}
                name={name}
                defaultValue={defaultValue}
            />
            {Icon && (
                <Icon className="absolute left-4 top-3 text-leaf size-4" />
            )}
        </div>
    );
};
