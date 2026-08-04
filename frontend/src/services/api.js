import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 12_000,
  headers: { Accept: 'application/json' },
});

// Pages should display a useful sentence, not an Axios implementation detail.
export function getApiErrorMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'The request took too long. Please try again.';
  }

  if (!error.response) {
    return 'The API is unavailable. Make sure the backend is running.';
  }

  return error.response.data?.error?.message || 'Something went wrong while loading data.';
}

export default api;
