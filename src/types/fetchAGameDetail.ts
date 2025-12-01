export interface GameDetailData {
  id: number;
  title: string;
  category: string;
  rating?: number;
  description?: string;
  features?: string[];
  releaseDate?: string;
  thumbnail: string;
  screenshots?: string[];
}

export interface FetchAGameDetail {
  data: GameDetailData[];
}
