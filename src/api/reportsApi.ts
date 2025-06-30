import { API_BASE_URL, handleResponse } from './baseApi';

interface GenerateReportParams {
  size: number;
  withErrors?: boolean;
  maxSpend?: number;
}

async function generateReport(params: GenerateReportParams): Promise<string> {
  const { size, withErrors = false, maxSpend = 1000 } = params;

  const queryParams = new URLSearchParams({
    size: size.toString(),
    withErrors: withErrors ? 'on' : 'off',
    maxSpend: maxSpend.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/report?${queryParams}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  return handleResponse<string>(response);
}

export const reportsApi = {
  generateReport,
};
