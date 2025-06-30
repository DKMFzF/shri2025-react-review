import { create } from 'zustand';

import { type AnalystState } from './type';

export const useAnalystStore = create<AnalystState>((set) => ({
  aggregatedData: null,
  isLoading: false,
  error: false,
  setAggregatedData: (data) => set({ aggregatedData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ aggregatedData: null, isLoading: false, error: false }),
}));
