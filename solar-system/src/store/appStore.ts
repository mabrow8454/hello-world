import { create } from 'zustand';

export interface AppState {
  // Selected planet
  selectedPlanet: string | null;
  setSelectedPlanet: (planetId: string | null) => void;

  // Time controls
  isPaused: boolean;
  timeSpeed: number; // Multiplier: 1, 10, 100, 1000
  currentTime: number; // Simulation time in days
  setIsPaused: (paused: boolean) => void;
  setTimeSpeed: (speed: number) => void;
  advanceTime: (delta: number) => void;
  resetTime: () => void;

  // UI state
  showInfo: boolean;
  toggleInfo: () => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;

  // Camera state
  cameraDistance: number;
  setCameraDistance: (distance: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Planet selection
  selectedPlanet: null,
  setSelectedPlanet: (planetId) => set({ selectedPlanet: planetId }),

  // Time controls
  isPaused: false,
  timeSpeed: 100,
  currentTime: 0,
  setIsPaused: (paused) => set({ isPaused: paused }),
  setTimeSpeed: (speed) => set({ timeSpeed: speed }),
  advanceTime: (delta) =>
    set((state) => ({
      currentTime: state.isPaused
        ? state.currentTime
        : state.currentTime + delta * state.timeSpeed,
    })),
  resetTime: () => set({ currentTime: 0 }),

  // UI state
  showInfo: true,
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  isMobile: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),

  // Camera
  cameraDistance: 100,
  setCameraDistance: (distance) => set({ cameraDistance: distance }),
}));
