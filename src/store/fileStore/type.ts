export type FileState = {
  fileName: string | null;
  file: File | null;
  isDragging: boolean;
  isUploaded: boolean;
  error?: boolean;
  setFileName: (fileName: string | null) => void;
  setFile: (file: File | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  setIsUploaded: (isUploaded: boolean) => void;
  processFiles: (files: FileList) => void;
  reset: () => void;
};
