export interface FetchGames {
    result: GameDetail[];
    length: number;
    totalPage: number;
}

interface GameDetail {
    id: number;
    title: string;
    category: string;
    rating: number;
    thumbnail: string;
}