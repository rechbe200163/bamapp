import { create } from 'zustand';

type StoreState = {
  name: string;
  setGameName: (name: string) => void;
};

export const useSelectedGameNameStore = create<StoreState>((set, get) => ({
  name: '',
  setGameName: (name) => set({ name }),
}));
