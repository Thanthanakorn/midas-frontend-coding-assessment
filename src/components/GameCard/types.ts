import type { GameDetail } from '../../types/fetchGames';

export interface GameCardProps {
  game: GameDetail;
  onClick: () => void;
}