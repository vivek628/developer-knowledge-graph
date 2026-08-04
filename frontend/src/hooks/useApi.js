import { useCallback, useEffect, useState } from 'react';
import api, { getApiErrorMessage } from '../services/api.js';

// This hook centralizes the loading, error, cancellation, and retry behavior
// shared by read-only pages.
export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestNumber, setRequestNumber] = useState(0);

  const retry = useCallback(() => setRequestNumber((number) => number + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const response = await api.get(endpoint, { signal: controller.signal });
        setData(response.data.data);
      } catch (requestError) {
        if (requestError.code !== 'ERR_CANCELED') {
          setError(getApiErrorMessage(requestError));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => controller.abort();
  }, [endpoint, requestNumber]);

  return { data, error, loading, retry };
}
