"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function CardPage() {
    const cardId = useParams().cardId;
    return <div>cc + {cardId}</div>;
}
