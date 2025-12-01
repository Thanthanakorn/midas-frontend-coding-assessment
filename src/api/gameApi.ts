import { httpClient } from './httpClient';
import type { FetchGameDetail } from '../types/gameDetail';
import type { FetchGames } from '../types/fetchGames';

export const gameApi = {
  async fetchGames(page: number = 1, rowPerPage: number = 10): Promise<FetchGames> {
    return httpClient.post<FetchGames>('/api/games', {
      page,
      rowPerPage
    });
  },

  async fetchGameDetail(id: number): Promise<FetchGameDetail> {
    return httpClient.get<FetchGameDetail>(`/api/games/${id}`);
  },

  async searchGames(query: string, page: number = 1, rowPerPage: number = 10): Promise<FetchGames> {
    return httpClient.post<FetchGames>(`/api/search?query=${encodeURIComponent(query)}`, {
      page,
      rowPerPage
    });
  },
};
