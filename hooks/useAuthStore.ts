import { create } from "zustand";

interface useAuthStore {
  stateToken: string | null;
  setToken: (token: string) => void;
  user: {
    fullName: string;
    email: string;
  };
  setUser: (user: any) => void;
}

export const useAuth = create<useAuthStore>((set) => ({
  stateToken: "",
  setToken: (token: string) => {
    set({ stateToken: token });
  },
  user: { fullName: "", email: "" },
  setUser: (user) => {
    set({ user: user });
  },
}));
