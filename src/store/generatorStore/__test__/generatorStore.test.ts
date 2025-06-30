import { useGeneratorStore } from '../generatorStore';
import { describe, expect, it, beforeEach } from 'vitest';

const initialState = useGeneratorStore.getState();

beforeEach(() => {
  useGeneratorStore.setState(initialState);
});

describe('State useGeneratorStore', () => {
  it('должно устанавливать состояние загрузки', () => {
    useGeneratorStore.getState().setLoading(true);
    expect(useGeneratorStore.getState().isLoading).toBe(true);
  });

  it('должно устанавливать ошибку', () => {
    const testError = 'Test error';
    useGeneratorStore.getState().setError(testError);
    expect(useGeneratorStore.getState().error).toBe(testError);
  });

  it('должно устанавливать URL для скачивания', () => {
    const testUrl = 'https://example.com/download';
    useGeneratorStore.getState().setDownloadUrl(testUrl);
    expect(useGeneratorStore.getState().downloadUrl).toBe(testUrl);
  });

  it('должно сбрасывать состояние к начальным значениям', () => {
    useGeneratorStore.setState({
      isLoading: true,
      error: 'Test',
      downloadUrl: 'https://test.com',
    });

    useGeneratorStore.getState().reset();

    expect(useGeneratorStore.getState()).toEqual({
      isLoading: false,
      error: null,
      downloadUrl: null,
      setLoading: expect.any(Function),
      setError: expect.any(Function),
      setDownloadUrl: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  it('должно корректно обрабатывать несколько последовательных изменений состояния', () => {
    useGeneratorStore.getState().setLoading(true);
    useGeneratorStore.getState().setDownloadUrl('url1');

    expect(useGeneratorStore.getState()).toMatchObject({
      isLoading: true,
      downloadUrl: 'url1',
    });

    useGeneratorStore.getState().setLoading(false);
    expect(useGeneratorStore.getState().isLoading).toBe(false);
  });
});
