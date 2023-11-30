import { create } from "zustand";

interface useCandidateStore {
  selectedVoter: string;
  setSelectedVoter: (name: string) => void;
  selectedId: number;
  setSelectedId: (id: number) => void;
}

export const useCandidate = create<useCandidateStore>((set) => ({
  selectedVoter: "",
  setSelectedVoter: (name: string) => {
    set({ selectedVoter: name });
  },
  selectedId: 0,
  setSelectedId: (id: number) => {
    set({ selectedId: id });
  },
}));
