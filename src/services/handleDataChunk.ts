import type { AggregatedData } from '../utils/type/api';

export const handleDataChunk = (
  chunk: string,
  setAggregatedData: (data: AggregatedData | null) => void
) => {
  try {
    const jsonStrings = chunk.trim().split(/\s(?={)/);

    if (jsonStrings.length > 1) {
      const lastJsonString = jsonStrings[jsonStrings.length - 1];
      const parsed = JSON.parse(lastJsonString) as AggregatedData;
      setAggregatedData(parsed);
    }
  } catch {
    throw new Error('Ошибка обработк чанка');
  }
};
