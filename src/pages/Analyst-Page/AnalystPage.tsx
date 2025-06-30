import { getStatus } from '../../utils/helpers/getStatus';
import { handleSubmitWrapper } from '../../services/handleSubmitWrapperAggregatedData';
import { AnalystDragAndDrop } from '../../components';
import { ButtonUI, HighlightsCardContainerUI } from '../../components/ui';
import { useAnalystStore, useFileStore } from '../../store';

import styles from './AnalystPage.module.css';

export const AnalystPage = () => {
  const isUploaded = useFileStore((state) => state.isUploaded);
  const file = useFileStore((state) => state.file);
  const resetFileStore = useFileStore((state) => state.reset);

  const {
    aggregatedData,
    isLoading,
    error,
    setAggregatedData,
    setIsLoading,
    setError,
    reset,
  } = useAnalystStore();

  const handleReset = () => {
    resetFileStore();
    reset();
  };

  return (
    <div className={styles['analyst-page']}>
      <div className={styles['analyst-page__controller']}>
        <span className={styles['analyst-page__description-text']}>
          Загрузите{' '}
          <span className={styles['analyst-page__bold-text']}>csv</span> файл и
          получите{' '}
          <span className={styles['analyst-page__bold-text']}>
            полную информацию
          </span>{' '}
          о нём за сверхнизкое время
        </span>

        <AnalystDragAndDrop
          onReset={handleReset}
          status={getStatus(error, isLoading, aggregatedData, file)}
          isLoading={isLoading}
        />

        {!error && !isLoading && !aggregatedData && (
          <ButtonUI
            type="send"
            isActive={!isUploaded}
            onClick={() =>
              handleSubmitWrapper(
                file,
                setError,
                setIsLoading,
                setAggregatedData
              )
            }
            disabled={isLoading || error}
          >
            Отправить
          </ButtonUI>
        )}
      </div>

      <div
        className={`
        ${
          !aggregatedData || error
            ? styles['analyst-page__highlights_none']
            : styles['analyst-page__highlights']
        }`}
      >
        {aggregatedData && !error ? (
          <HighlightsCardContainerUI aggregatedData={aggregatedData} />
        ) : (
          <div className={styles['analyst-page__none-text']}>
            Здесь{' '}
            <span className={styles['analyst-page__none-text_nowrap']}>
              появятся хайлайты
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
