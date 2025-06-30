import { handleDataChunk } from './handleDataChunk';
import { type AggregatedData } from '../utils/type/api';
import { aggregateApi } from '../api/aggregateApi';

export const handleSubmit = async (
  file: File | null,
  setError: (error: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  setAggregatedData: (data: AggregatedData | null) => void,
  onComplete?: (success: boolean) => void
) => {
  if (!file) {
    setError(true);
    onComplete?.(false);
    return;
  }

  setIsLoading(true);
  setError(false);
  setAggregatedData(null);

  try {
    await aggregateApi.aggregateData({
      rows: 10000,
      file: file,
      onDataReceived: (chunk) => handleDataChunk(chunk, setAggregatedData),
    });
    onComplete?.(true);
  } catch {
    setError(true);
    onComplete?.(false);
    throw new Error('Ошибка обработки файла');
  } finally {
    setIsLoading(false);
  }
};
