import { describe, it, expect, vi } from 'vitest';
import { handleDataChunk } from '../handleDataChunk';
import type { AggregatedData } from '../../utils/type/api';

describe('Обработка чанка данных', () => {
  it('должен корректно парсить и устанавливать агрегированные данные для валидного чанка с несколькими JSON', () => {
    const mockSetAggregatedData = vi.fn();
    const validChunk = `{"total": 50} {"total_spend_galactic": 100, "rows_affected": 10}`;
    const expectedData: AggregatedData = {
      total_spend_galactic: 100,
      rows_affected: 10
    };

    handleDataChunk(validChunk, mockSetAggregatedData);

    expect(mockSetAggregatedData).toHaveBeenCalledWith(expectedData);
  });

  it('не должен вызывать setAggregatedData для чанка с одним JSON', () => {
    const mockSetAggregatedData = vi.fn();
    const singleJsonChunk = `{"total_spend_galactic": 100, "rows_affected": 10}`;

    handleDataChunk(singleJsonChunk, mockSetAggregatedData);

    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });

  it('должен выбрасывать ошибку для невалидного чанка', () => {
    const mockSetAggregatedData = vi.fn();
    const invalidChunk = 'invalid json { not valid }';

    expect(() => handleDataChunk(invalidChunk, mockSetAggregatedData)).toThrow('Ошибка обработк чанка');
    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });

  it('должен корректно обрабатывать пустой чанк', () => {
    const mockSetAggregatedData = vi.fn();
    const emptyChunk = '';

    expect(() => handleDataChunk(emptyChunk, mockSetAggregatedData)).not.toThrow();
    expect(mockSetAggregatedData).not.toHaveBeenCalled();
  });
});
