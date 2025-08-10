// connection.store.ts
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

type ConnState =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'discovering'
  | 'ready'
  | 'stale'
  | 'reconnecting';

type ConnectionStore = {
  state: ConnState;
  deviceId?: string;
  lastHeartbeat?: number;
  error?: string;
  setState: (s: ConnState) => void;
  setDevice: (id?: string) => void;
  beat: () => void;
  setError: (msg?: string) => void;
  reset: () => void;
};

export const useConnection = create<ConnectionStore>()(
  persist(
    subscribeWithSelector((set) => ({
      state: 'disconnected',
      deviceId: undefined,
      lastHeartbeat: undefined,
      error: undefined,

      setState: (s) => set({ state: s }),
      setDevice: (id) => set({ deviceId: id }),
      beat: () => set({ lastHeartbeat: Date.now(), error: undefined }),
      setError: (msg) => set({ error: msg }),
      reset: () =>
        set({
          state: 'disconnected',
          deviceId: undefined,
          lastHeartbeat: undefined,
          error: undefined,
        }),
    })),
    { name: 'bamboard-conn' }
  )
);
