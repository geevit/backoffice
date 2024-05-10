import React from 'react'

export interface PeriodSelectorItemProps {
  period: "DAY" | "MONTH" | "YEAR";
  setPeriod: (period: "DAY" | "MONTH" | "YEAR") => void;
  activePeriod: "DAY" | "MONTH" | "YEAR";
}

export const PeriodSelectorItem = ({ period, setPeriod, activePeriod }: PeriodSelectorItemProps) => {
  return (
    <div onClick={() => setPeriod(period)} className="h-full px-2 rounded-lg flex items-center hover:bg-white-hover cursor-pointer"><span className={`z-10 transition-all ease-out duration-300 ${activePeriod === period ? "text-white" : "text-leaf"}`}>
      {period === "DAY" ? "Journée" : period === "MONTH" ? "Mois" : "Année"}</span></div>

  )
}
