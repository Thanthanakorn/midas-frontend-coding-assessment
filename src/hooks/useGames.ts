import { useState, useEffect } from 'react';
import { gameApi } from '../api/gameApi';
import type { FetchAGameDetail } from '../types/fetchAGameDetail';

export function useGames() {
  const [games, setGames] = useState<FetchAGameDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadGames() {
      try {
        setLoading(true);
        setError(null);
        const data = await gameApi.fetchGames();
        
        if (mounted) {
          setGames(data.result);
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
  }, []);

  return { games, loading, error };
}
