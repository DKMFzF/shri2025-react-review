import { describe, it, expect, vi, beforeEach } from 'vitest';
import { reportsApi } from '../reportsApi';
import { API_BASE_URL } from '../baseApi';

global.fetch = vi.fn();

describe('API для работы с отчетами', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен выполнять GET-запрос с корректными параметрами', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue('report data'),
      headers: new Headers({ 'content-type': 'application/json' })
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const result = await reportsApi.generateReport({
      size: 100,
      withErrors: true,
      maxSpend: 500
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/report?size=100&withErrors=on&maxSpend=500`,
      expect.objectContaining({
        method: 'GET'
      })
    );
    expect(result).toBe('report data');
  });

  it('должен корректно обрабатывать ошибочный ответ сервера', async () => {
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue({ error: 'Server error' })
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    await expect(reportsApi.generateReport({ size: 100 })).rejects.toThrow('Server error');
  });
});
