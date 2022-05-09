export interface Player {
  id: number;
  username: string;
  avatar: string;
  team: Team;
  isReady: boolean;
}

export enum Team {
  Radiant,
  Dire
}
