import { create } from "zustand";

export const useOrdersModalStore = create<{
  isOpen: boolean;
  order?: Order;
  open(order: Order): void;
  close(): void;
}>((set) => ({
  isOpen: false,
  order: undefined,
  open(order) {
    set(() => ({ isOpen: true, order }));
  },
  close() {
    set({ isOpen: false });
    setTimeout(() => set({ order: undefined }), 500);
  },
}));
