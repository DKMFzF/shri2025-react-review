import { type AggregatedData } from '../../utils/type/api';

export type AnalystState = {
  aggregatedData: AggregatedData | null;
  isLoading: boolean;
  error: boolean;
  setAggregatedData: (data: AggregatedData | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  reset: () => void;
};
