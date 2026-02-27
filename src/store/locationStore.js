import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocationStore = create(
  persist(
    (set) => ({
      location: null,
      locationError: false,

      setLocation: (location) => set({ location }),

      setLocationError: (value) => set({ locationError: value }),

      clearLocation: () => set({ location: null }),
    }),
    {
      name: "user-location-storage",
    }
  )
);