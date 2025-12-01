import { useState, useCallback, useEffect, useRef } from 'react';
import { gameApi } from '../api/gameApi';
import type { FetchGames } from '../types/fetchGames';

export function useSearchGames(page: number = 1, rowPerPage: number = 10, debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FetchGames>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(undefined);
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
        const data = await gameApi.searchGames(query, page, rowPerPage);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults(undefined);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, page, rowPerPage, debounceMs]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults(undefined);
    setError(null);
  }, []);

  return { query, results, loading, error, search, clearSearch };
}
