import { useCallback, useRef } from 'react';

import { type UseDragAndDropProps } from './type';

export const useDragAndDrop = ({
  onFilesSelected,
  onDragStateChange,
}: UseDragAndDropProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length) onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const isDragging = e.type === 'dragenter' || e.type === 'dragover';
      onDragStateChange?.(isDragging);
    },
    [onDragStateChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDragStateChange?.(false);

      if (e.dataTransfer.files?.length) {
        onFilesSelected(e.dataTransfer.files);
      }
    },
    [onFilesSelected, onDragStateChange]
  );

  return {
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    handleDrag,
    handleDrop,
  };
};
