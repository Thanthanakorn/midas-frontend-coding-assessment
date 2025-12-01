import { httpClient } from './httpClient';
import type { FetchAGameDetail} from '../types/fetchAGameDetail';
import type { FetchGames } from '../types/fetchGames';

export const gameApi = {
  async fetchGames(page: number = 1, rowPerPage: number = 10): Promise<FetchGames> {
    return httpClient.post<FetchGames>('/api/games', {
      page,
      rowPerPage
    });
  },

  async fetchGameDetail(id: number): Promise<FetchAGameDetail> {
    return httpClient.get<FetchAGameDetail>(`/api/games/${id}`);
  },

  async searchGames(query: string, page: number = 1, rowPerPage: number = 10): Promise<FetchGames> {
    return httpClient.post<FetchGames>(`/api/search?query=${encodeURIComponent(query)}`, {
      page,
      rowPerPage
    });
  },
};
