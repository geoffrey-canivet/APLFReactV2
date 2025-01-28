import { create } from 'zustand';

const usePeriodStore = create((set) => ({
    period: null,
    setPeriod: (selectedPrediode) => set({ period: selectedPrediode }),
    clearPeriod: () => set({ period: null }),
}));