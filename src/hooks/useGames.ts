import { useState, useEffect } from 'react';
import { gameApi } from '../api/gameApi';
import type { FetchGames } from '../types/fetchGames';

export function useGames(page: number = 1, rowPerPage: number = 10) {
  const [games, setGames] = useState<FetchGames['result']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadGames() {
      try {
        setLoading(true);
        setError(null);
        const data = await gameApi.fetchGames(page, rowPerPage);
        
        if (mounted) {
          setGames(data.result);
          setTotalItems(data.length);
          setTotalPages(data.totalPage);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load games');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => {
      mounted = false;
    };
  }, [page, rowPerPage]);

  return { games, loading, error, totalItems, totalPages };
}
