import { create } from "zustand";

export const useTBERidersModalStore = create<{
  isOpen: boolean;
  rider?: Rider;
  open(rider: Rider): void;
  close(): void;

}>((set) => ({
  isOpen: false,
  rider: undefined,
  open(rider) {
    set(() => ({ isOpen: true, rider }));
  },
  close() {
    set({ isOpen: false });
    setTimeout(() => set({ rider: undefined }), 500);
  },
}));
