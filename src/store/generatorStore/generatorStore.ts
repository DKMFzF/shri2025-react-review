import { create } from 'zustand';

import { type GeneratorStateProps } from './type';

export const useGeneratorStore = create<GeneratorStateProps>((set) => ({
  isLoading: false,
  error: null,
  downloadUrl: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setDownloadUrl: (downloadUrl) => set({ downloadUrl }),
  reset: () => set({ isLoading: false, error: null, downloadUrl: null }),
}));
