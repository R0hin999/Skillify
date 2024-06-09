import { create } from "zustand";

type AdminData = {
  data: {} | null;
  setData: (newData: {}) => void;
};

export const useAdminData = create<AdminData>((set) => ({
  data: null,
  setData: (newData: {}) => set((state) => ({ data: newData })),
}));
