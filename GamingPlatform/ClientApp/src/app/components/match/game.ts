export interface Game {
  id: number;
  name: string;
  gameMode: string;
  players: number;
  maxPlayers: number;
  server: string;
  locked: number;
  rate: number;
}
