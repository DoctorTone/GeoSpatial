import { create } from "zustand";
import type { ScreenSize } from "./Config";

type FrameworkState = {
  screenSize: ScreenSize;
  setScreenSize: (size: ScreenSize) => void;
  infoDialogOpen: boolean;
  setShowInfoDialog: (status: boolean) => void;
  autoRotate: boolean;
  setAutoRotate: (status: boolean) => void;
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
};

const useStore = create<FrameworkState>((set) => ({
  screenSize: { width: window.innerWidth, height: window.innerHeight },
  setScreenSize: (size) =>
    set((state) => ({ screenSize: { ...state.screenSize, ...size } })),
  infoDialogOpen: false,
  setShowInfoDialog: (status) => set(() => ({ infoDialogOpen: status })),
  autoRotate: true,
  setAutoRotate: (status) => set(() => ({ autoRotate: status })),
  currentMonth: "January",
  setCurrentMonth: (month) => set(() => ({ currentMonth: month })),
}));

export default useStore;
