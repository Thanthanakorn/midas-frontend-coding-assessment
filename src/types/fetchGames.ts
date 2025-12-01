export interface GameDetail {
  id: number;
  title: string;
  category: string;
  rating: number;
  thumbnail: string;
}

export interface FetchGames {
  result: GameDetail[];
  length: number;
  totalPage: number;
}