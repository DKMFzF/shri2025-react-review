import { useFileStore } from '../../store';
import { AnalystDragAndDropUI } from '../ui';
import { useDragAndDrop } from '../../hooks';
import { type AnalystDragAndDropProps } from './type';

export const AnalystDragAndDrop = ({
  onReset,
  status,
  isLoading,
}: AnalystDragAndDropProps) => {
  const { fileName, isDragging, setIsDragging, processFiles, error } =
    useFileStore();

  const {
    fileInputRef,
    handleButtonClick: onButtonClick,
    handleFileChange: onFileChange,
    handleDrag: onDrag,
    handleDrop: onDrop,
  } = useDragAndDrop({
    onFilesSelected: processFiles,
    onDragStateChange: setIsDragging,
  });

  const handleReset = () => onReset();
  const combinedStatus = error ? 'error' : status;

  return (
    <AnalystDragAndDropUI
      fileName={fileName}
      isDragging={isDragging}
      onButtonClick={onButtonClick}
      onFileChange={onFileChange}
      onDrag={onDrag}
      onDrop={onDrop}
      onReset={handleReset}
      inputRef={fileInputRef}
      status={combinedStatus}
      isLoading={isLoading}
    />
  );
};
