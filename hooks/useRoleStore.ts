import { create } from "zustand";

interface useRoleStore {
  role: string;
  setRole: (roleName: string) => void;
}

export const useRole = create<useRoleStore>((set) => ({
  role: "",
  setRole: (roleName: string) => {
    set({ role: roleName });
  },
}));
