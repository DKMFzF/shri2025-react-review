export type AnalystDragAndDropUIProps = {
  fileName: string | null;
  isDragging: boolean;
  onButtonClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onReset: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  status?: 'default' | 'done' | 'error' | string;
  isLoading?: boolean;
};
