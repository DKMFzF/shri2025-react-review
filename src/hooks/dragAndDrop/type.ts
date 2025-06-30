export type FileHandler = (files: FileList) => void;
export type UseDragAndDropProps = {
  onFilesSelected: FileHandler;
  onDragStateChange?: (isDragging: boolean) => void;
};
