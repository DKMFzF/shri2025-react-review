import type { AggregatedData } from '../utils/type/api';
import { handleSubmit } from './handleSubmitAggregatedData';

export const handleSubmitWrapper = async (
  file: File | null,
  setError: (error: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  setAggregatedData: (data: AggregatedData | null) => void
) => {
  if (!file) return;

  const uniqueId = Date.now();
  const fileId = `${file.name}-${file.lastModified}-${file.size}-${uniqueId}`;

  let latestData: AggregatedData | null = null;

  const wrappedSetAggregatedData = (data: AggregatedData | null) => {
    latestData = data;
    setAggregatedData(data);
  };

  await handleSubmit(
    file,
    setError,
    setIsLoading,
    wrappedSetAggregatedData,
    async (success) => {
      const historyStr = localStorage.getItem('analysisHistory');
      const history = historyStr ? JSON.parse(historyStr) : [];

      const historyItem = {
        fileId,
        fileName: file.name,
        date: new Date().toLocaleDateString('ru-RU'),
        status: success ? 'done' : 'error',
        data: latestData,
        lastUpdated: Date.now(),
      };

      history.unshift(historyItem);
      localStorage.setItem('analysisHistory', JSON.stringify(history));
    }
  );
};
