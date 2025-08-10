import { create } from 'zustand';

export type Color = `#${string}`;

type StoreState = {
  color: string;
  setGameTheme: (color: string) => void;
};

export const useGameThemeStore = create<StoreState>((set, get) => ({
  color: '#000000',
  setGameTheme: (color) => set({ color }),
}));
