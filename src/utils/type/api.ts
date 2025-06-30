export interface GenerateReportParams {
  size: number;
  withErrors?: boolean;
  maxSpend?: number;
}

export type AggregatedData = {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at?: number;
  big_spent_at?: number;
  less_spent_value?: number;
  big_spent_value?: number;
  average_spend_galactic?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
};
