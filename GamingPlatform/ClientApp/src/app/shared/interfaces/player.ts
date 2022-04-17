export interface Player {
  username: string;
  avatar: string;
  team: Team;
}

export enum Team {
  Radiant,
  Dire
}
