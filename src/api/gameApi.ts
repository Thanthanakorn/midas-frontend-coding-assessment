import { httpClient } from './httpClient';
import type { FetchAGameDetail} from '../types/fetchAGameDetail';
import type { FetchGames } from '../types/fetchGames';

export const gameApi = {
  async fetchGames(): Promise<FetchGames> {
    return httpClient.post<FetchGames>('/api/games');
  },

  async fetchGameDetail(id: string): Promise<FetchAGameDetail> {
    return httpClient.get<FetchAGameDetail>(`/api/games/${id}`);
  },

  async searchGames(query: string): Promise<FetchGames> {
    return httpClient.post<FetchGames>(`/api/search?query=${encodeURIComponent(query)}`);
  },
};
