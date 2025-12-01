import { useState, useEffect } from 'react';
import { gameApi } from '../api/gameApi';
import type { FetchAGameDetail } from '../types/fetchAGameDetail';

export function useGameDetail(gameId: number | null) {
  const [game, setGame] = useState<FetchAGameDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      setGame(null);
      return;
    }

    let mounted = true;

    async function loadGameDetail() {
      try {
        setLoading(true);
        setError(null);
        const data = await gameApi.fetchGameDetail(gameId!.toString());
        
        if (mounted) {
          setGame(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load game details');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadGameDetail();

    return () => {
      mounted = false;
    };
  }, [gameId]);

  return { game, loading, error };
}
