import React from 'react'
import { PeriodSelectorItem } from './PeriodSelectorItem';

export interface PeriodSelectorWrapperProps {
  setPeriod: (period: "DAY" | "MONTH" | "YEAR") => void;
  activePeriod: "DAY" | "MONTH" | "YEAR";
}

export const PeriodSelectorWrapper = ({setPeriod, activePeriod}: PeriodSelectorWrapperProps) => {
  return (
    <div 
    className={`h-10 bg-white rounded-xl p-1 flex items-center text-sm font-ro-semibold text-leaf gap-2 select-none relative`}>
      <PeriodSelectorItem activePeriod={activePeriod} setPeriod={setPeriod} period='DAY'/>
      <PeriodSelectorItem activePeriod={activePeriod} setPeriod={setPeriod} period='MONTH'/>
      <PeriodSelectorItem activePeriod={activePeriod} setPeriod={setPeriod} period='YEAR'/>
    <div className={`absolute bg-leaf h-8 z-1 rounded-lg flex items-center justify-center text-white transition-all ease-out duration-300 ${activePeriod === "DAY" ? "translate-x-0 w-[4.4rem]": activePeriod === "MONTH" ? "translate-x-[74px] w-[54px]" : "translate-x-[132px] w-[58px]"}`}></div>
</div>
  )
}
