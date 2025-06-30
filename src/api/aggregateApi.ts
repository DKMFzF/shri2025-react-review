import { API_BASE_URL, handleResponse } from './baseApi';

interface AggregateParams {
  rows: number;
  file: File;
  onDataReceived?: (data: string) => void;
}

async function aggregateData(params: AggregateParams): Promise<string> {
  const { rows, file, onDataReceived } = params;

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/aggregate?rows=${rows}`, {
    method: 'POST',
    body: formData,
    headers: {
      accept: 'application/json',
    },
  });

  if (onDataReceived && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
      onDataReceived(result);
    }

    return result;
  }

  return handleResponse(response);
}

export const aggregateApi = {
  aggregateData,
};
