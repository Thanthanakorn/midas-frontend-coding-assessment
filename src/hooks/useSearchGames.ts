import { useState, useCallback, useEffect, useRef } from 'react';
import { gameApi } from '../api/gameApi';
import type { FetchAGameDetail } from '../types/fetchAGameDetail';

export function useSearchGames(debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FetchAGameDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await gameApi.searchGames(query);
        setResults(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return { query, results, loading, error, search, clearSearch };
}
