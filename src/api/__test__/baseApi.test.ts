import { describe, it, expect, vi } from 'vitest';
import { handleResponse } from '../baseApi';

describe('Обработка ответа от API', () => {
  it('должен возвращать JSON для успешного JSON-ответа', async () => {
    const mockData = { key: 'value' };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
      headers: new Headers({ 'content-type': 'application/json' })
    };

    const result = await handleResponse(mockResponse as any);
    expect(result).toEqual(mockData);
  });

  it('должен возвращать текст для успешного не-JSON ответа', async () => {
    const mockText = 'text response';
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue(mockText),
      headers: new Headers()
    };

    const result = await handleResponse(mockResponse as any);
    expect(result).toBe(mockText);
  });

  it('должен выбрасывать ошибку для неуспешного ответа', async () => {
    const mockError = { error: 'Server error' };
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue(mockError)
    };

    await expect(handleResponse(mockResponse as any)).rejects.toThrow('Server error');
  });
});
