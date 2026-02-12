import { create } from "zustand";

type AppFilterState = {
  query: string;
  setQuery: (query: string) => void;
};

export const useAppFilterStore = create<AppFilterState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
