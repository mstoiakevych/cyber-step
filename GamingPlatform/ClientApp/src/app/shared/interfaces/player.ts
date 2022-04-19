export interface Player {
  id: number;
  username: string;
  avatar: string;
  team: Team;
}

export enum Team {
  Radiant,
  Dire
}
