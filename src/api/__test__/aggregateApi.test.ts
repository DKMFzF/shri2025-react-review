import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aggregateApi } from '../aggregateApi';
import { API_BASE_URL } from '../baseApi';

global.fetch = vi.fn();

describe('API для агрегации данных', () => {
  const mockFile = new File(['content'], 'test.csv', { type: 'text/csv' });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен выполнять POST-запрос с form-data', async () => {
    const mockResponse = {
      ok: true,
      body: {
        getReader: vi.fn().mockReturnValue({
          read: vi.fn().mockResolvedValueOnce({
            done: false,
            value: new TextEncoder().encode('chunk1')
          }).mockResolvedValueOnce({
            done: true
          })
        })
      },
      headers: new Headers()
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    const onDataReceived = vi.fn();
    await aggregateApi.aggregateData({
      rows: 10000,
      file: mockFile,
      onDataReceived
    });

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/aggregate?rows=10000`,
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData)
      })
    );
    expect(onDataReceived).toHaveBeenCalledWith('chunk1');
  });

  it('должен выбрасывать ошибку при неудачном ответе сервера', async () => {
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue({ error: 'Server error' })
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as any);

    await expect(aggregateApi.aggregateData({
      rows: 10000,
      file: mockFile
    })).rejects.toThrow('Server error');
  });
});
