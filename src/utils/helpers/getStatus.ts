import { type AggregatedData } from '../type/api';

export const getStatus = (
  error: boolean,
  isLoading: boolean,
  aggregatedData: AggregatedData | null,
  file: File | null
) => {
  if (error) return 'error';
  if (isLoading) return 'processing';
  if (aggregatedData) return 'done';
  if (file) return 'default';
  return 'empty';
};
