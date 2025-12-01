export interface FetchAGameDetail {
  id: number;
  title: string;
  category: string;
  rating: number;
  description?: string;
  features?: string[];
  releaseDate?: string;
  thumbnail: string;
  screenshots?: string[];
}
