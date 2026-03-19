import { create } from "zustand";

export const useMapFilterStore = create((set) => ({
  filters: {
    gender: "",
    page: 1,
    limit: 10,
  },
  setGender: (category) =>
    set((state) => ({
      filters: {
        ...state.filters,
        // Toggle off if clicking the same active category, otherwise set new
        gender: state.filters.gender === category ? "" : category,
        page: 1, // Reset pagination to page 1 on filter change
      },
    })),
  setPage: (page) =>
    set((state) => ({
      filters: { ...state.filters, page },
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters, page: 1 },
    })),
  resetFilters: () =>
    set(() => ({
      filters: { gender: "", page: 1, limit: 10 },
    })),
}));
