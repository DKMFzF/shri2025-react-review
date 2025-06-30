import { useAnalystStore } from '../analystStore';
import { type AggregatedData } from '../../../utils/type/api';
import { describe, expect, it, beforeEach } from 'vitest';

const mockAggregatedData: AggregatedData = {
  total_spend_galactic: 1000,
  rows_affected: 1000,
  less_spent_at: 1000,
  big_spent_at: 1000,
  less_spent_value: 1000,
  big_spent_value: 1000,
  average_spend_galactic: 1000,
  big_spent_civ: '1000',
  less_spent_civ: '1000',
};

const initialState = useAnalystStore.getState();

beforeEach(() => {
  useAnalystStore.setState(initialState);
});

describe('State аналитики useAnalystStore', () => {
  describe('Базовые методы изменения состояния', () => {
    it('должно устанавливать агрегированные данные', () => {
      useAnalystStore.getState().setAggregatedData(mockAggregatedData);
      expect(useAnalystStore.getState().aggregatedData).toEqual(
        mockAggregatedData
      );
    });

    it('должно сбрасывать агрегированные данные в null', () => {
      useAnalystStore.getState().setAggregatedData(null);
      expect(useAnalystStore.getState().aggregatedData).toBeNull();
    });

    it('должно изменять состояние загрузки', () => {
      useAnalystStore.getState().setIsLoading(true);
      expect(useAnalystStore.getState().isLoading).toBe(true);

      useAnalystStore.getState().setIsLoading(false);
      expect(useAnalystStore.getState().isLoading).toBe(false);
    });

    it('должно изменять состояние ошибки', () => {
      useAnalystStore.getState().setError(true);
      expect(useAnalystStore.getState().error).toBe(true);

      useAnalystStore.getState().setError(false);
      expect(useAnalystStore.getState().error).toBe(false);
    });
  });

  describe('Сброс состояния', () => {
    it('должно полностью сбрасывать состояние к начальным значениям', () => {
      useAnalystStore.setState({
        aggregatedData: mockAggregatedData,
        isLoading: true,
        error: true,
      });

      useAnalystStore.getState().reset();

      expect(useAnalystStore.getState()).toEqual({
        aggregatedData: null,
        isLoading: false,
        error: false,
        setAggregatedData: expect.any(Function),
        setIsLoading: expect.any(Function),
        setError: expect.any(Function),
        reset: expect.any(Function),
      });
    });

    it('должно корректно работать при сбросе уже начального состояния', () => {
      useAnalystStore.getState().reset();
      const state = useAnalystStore.getState();

      expect(state.aggregatedData).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(false);
    });
  });

  describe('Изолированность состояний', () => {
    it('не должно влиять на другие состояния при установке агрегированных данных', () => {
      useAnalystStore.setState({ isLoading: true, error: false });
      useAnalystStore.getState().setAggregatedData(mockAggregatedData);

      const state = useAnalystStore.getState();
      expect(state.aggregatedData).toEqual(mockAggregatedData);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(false);
    });

    it('не должно влиять на другие состояния при изменении статуса загрузки', () => {
      useAnalystStore.setState({
        aggregatedData: mockAggregatedData,
        error: true,
      });
      useAnalystStore.getState().setIsLoading(true);

      const state = useAnalystStore.getState();
      expect(state.isLoading).toBe(true);
      expect(state.aggregatedData).toEqual(mockAggregatedData);
      expect(state.error).toBe(true);
    });

    it('не должно влиять на другие состояния при изменении статуса ошибки', () => {
      useAnalystStore.setState({
        aggregatedData: mockAggregatedData,
        isLoading: true,
      });
      useAnalystStore.getState().setError(true);

      const state = useAnalystStore.getState();
      expect(state.error).toBe(true);
      expect(state.aggregatedData).toEqual(mockAggregatedData);
      expect(state.isLoading).toBe(true);
    });
  });

  describe('Сложные сценарии', () => {
    it('должно корректно обрабатывать последовательные изменения состояния', () => {
      useAnalystStore.getState().setIsLoading(true);
      useAnalystStore.getState().setAggregatedData(mockAggregatedData);
      useAnalystStore.getState().setError(true);

      const state = useAnalystStore.getState();
      expect(state).toMatchObject({
        aggregatedData: mockAggregatedData,
        isLoading: true,
        error: true,
      });

      useAnalystStore.getState().reset();

      expect(useAnalystStore.getState()).toMatchObject({
        aggregatedData: null,
        isLoading: false,
        error: false,
      });
    });
  });
});
