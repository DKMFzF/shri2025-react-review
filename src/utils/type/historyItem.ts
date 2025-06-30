import type { AggregatedData } from './api';

export type HistoryItem = {
  fileId: string;
  fileName: string;
  date: string;
  status: 'done' | 'error';
  data: AggregatedData | null;
  lastUpdated: number;
};
