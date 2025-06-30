import { useEffect } from 'react';

import { ButtonUI, ProcessBarUI, StatusContentUI } from '../../components/ui';
import { reportsApi } from '../../api/reportsApi';
import { useGeneratorStore } from '../../store';
import styles from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  const {
    isLoading,
    error,
    downloadUrl,
    setLoading,
    setError,
    setDownloadUrl,
    reset,
  } = useGeneratorStore();

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const reportData = await reportsApi.generateReport({
        size: 0.02,
        withErrors: false,
        maxSpend: 1000,
      });

      const blob = new Blob([reportData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'generation.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    reset();
  };

  if (error) {
    return (
      <div className={styles['generator-page']}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
        <StatusContentUI
          status="error"
          statusText="Ошибка"
          descriptionText="упс, не то..."
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className={styles['generator-page']}>
      Сгенерируйте готовый csv-файл нажатием одной кнопки
      {downloadUrl ? (
        <>
          <StatusContentUI
            status="done"
            statusText="Done!"
            descriptionText="файл сгенерирован!"
            onDelete={handleDelete}
          />
        </>
      ) : !isLoading ? (
        <ButtonUI type="send" onClick={handleGenerate} disabled={isLoading}>
          Начать Генерацию
        </ButtonUI>
      ) : (
        <>
          <ProcessBarUI />
          идёт процесс генерации
        </>
      )}
    </div>
  );
};
