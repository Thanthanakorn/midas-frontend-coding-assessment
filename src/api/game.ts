import { httpClient } from './httpClient';
import type { GamesResponse, GameDetail, SearchResponse } from '../types/fetchAGameDetail';

export const gameApi = {
  async fetchGames(): Promise<GamesResponse> {
    return httpClient.post<GamesResponse>('/api/games');
  },

  async fetchGameDetail(id: string): Promise<GameDetail> {
    return httpClient.get<GameDetail>(`/api/games/${id}`);
  },

  async searchGames(query: string): Promise<SearchResponse> {
    return httpClient.post<SearchResponse>(`/api/search?query=${encodeURIComponent(query)}`);
  },
};
