import { create } from "zustand";

export const useActivePageStore = create<{
    activePage: string;
    setActivePage: (activePage: string) => void;
}>((set) => ({
    activePage: "Dashboard",
    setActivePage: (activePage: string) => set({ activePage }),
}));
