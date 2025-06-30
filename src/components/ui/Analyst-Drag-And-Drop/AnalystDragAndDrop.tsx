import { ButtonUploadUI, StatusContentUI, ProcessBarUI } from '..';

import { type AnalystDragAndDropUIProps } from './type';
import styles from './AnalystDragAndDrop.module.css';

export const AnalystDragAndDropUI = ({
  fileName,
  isDragging,
  onButtonClick,
  onFileChange,
  onDrag,
  onDrop,
  onReset,
  inputRef,
  status = 'default',
  isLoading = false,
}: AnalystDragAndDropUIProps) => (
  <div
    className={`${styles['analyst-drag-and-drop__container']} ${
      isDragging ? styles['analyst-drag-and-drop__container_dragging'] : ''
    } ${
      status === 'error'
        ? styles['analyst-drag-and-drop__container_error']
        : fileName
          ? styles['analyst-drag-and-drop__container_uploaded']
          : ''
    }`}
    onDragEnter={onDrag}
    onDragOver={onDrag}
    onDragLeave={onDrag}
    onDrop={onDrop}
  >
    <input
      type="file"
      ref={inputRef}
      onChange={onFileChange}
      className={styles['analyst-drag-and-drop__file-input']}
      accept=".csv"
    />
    {fileName ? (
      isLoading ? (
        <ProcessBarUI />
      ) : (
        <StatusContentUI
          status={status}
          statusText={fileName}
          descriptionText={
            status === 'error'
              ? 'упс, не то...'
              : status === 'done'
                ? 'готово!'
                : 'файл был загружен'
          }
          onDelete={onReset}
        />
      )
    ) : (
      <>
        <ButtonUploadUI onClick={onButtonClick}>Загрузить файл</ButtonUploadUI>
        <span>или перетащите сюда</span>
      </>
    )}
  </div>
);
