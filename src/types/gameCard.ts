import type { GameDetail } from './fetchGames';

export interface GameCardProps {
  game: GameDetail;
  onClick: () => void;
}