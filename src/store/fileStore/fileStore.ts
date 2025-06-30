import { create } from 'zustand';

import { type FileState } from './type';

export const useFileStore = create<FileState>((set) => ({
  fileName: null,
  file: null,
  isDragging: false,
  isUploaded: false,
  setFileName: (fileName) => set({ fileName }),
  setFile: (file) => set({ file }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setIsUploaded: (isUploaded) => set({ isUploaded }),
  processFiles: (files) => {
    const file = files[0];
    const isValid = file.name.toLowerCase().endsWith('.csv');

    if (isValid) {
      set({
        fileName: file.name,
        file: file,
        isUploaded: true,
        error: false,
      });
    } else {
      set({
        fileName: file.name,
        file: null,
        isUploaded: false,
        error: true,
      });
    }
  },
  reset: () =>
    set({
      fileName: null,
      file: null,
      isDragging: false,
      isUploaded: false,
      error: false,
    }),
}));
