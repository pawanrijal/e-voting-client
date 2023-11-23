import { create } from "zustand";

interface useAuthStore {
  stateToken: string | null;
  setToken: (token: string) => void;
}

export const useAuth = create<useAuthStore>((set) => ({
  stateToken: "",
  setToken: (token: string) => {
    set({ stateToken: token });
  },
}));
