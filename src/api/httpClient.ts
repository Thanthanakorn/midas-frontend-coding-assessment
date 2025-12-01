const API_BASE_URL = 'https://fe-test-api.midassoft.dev';

export class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new ApiError(response.status, errorText || response.statusText);
  }

  return response.json();
}

export const httpClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body || {}),
    });

    return handleResponse<T>(response);
  },
};
