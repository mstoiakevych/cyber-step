export interface Match {
  Name: string;
  GameMode: GameMode;
  Server: DotaServerType;
}

export interface CreatedMatch {
  Id: number,
  PlayerId: number
}

export enum Team { // todo move to player
  Radiant,
  Dire
}

export enum GameMode {
  OneVsOne,
  TwoVsTwo,
  FiveVsFive
}

export interface GameModeRepresentation {
  gameMode: GameMode,
  representation: string
}

export const gameModeRepresentations: GameModeRepresentation[] = [
  {
    gameMode: GameMode.OneVsOne,
    representation: 'One Vs One'
  },
  {
    gameMode: GameMode.TwoVsTwo,
    representation: 'Two Vs Two'
  },
  {
    gameMode: GameMode.FiveVsFive,
    representation: 'Five Vs Five'
  }
]


export type DotaServerType =
  "sl_us_west"
  | "sl_us_east"
  | "sl_europe_west"
  | "sl_singapore"
  | "sl_dubai"
  | "sl_stockholm"
  | "sl_brazil"
  | "sl_austria"
  | "sl_australia"
  | "sl_south_africa"
  | "sl_chile"
  | "sl_peru"
  | "sl_dota_region_argentina"
  | "sl_india"
  | "sl_japan"
  | "sl_taiwan"

export interface DotaServerRepresentation {
  server: DotaServerType,
  representation: string
}

export const serverRepresentations: DotaServerRepresentation[] = [
  {
    server: 'sl_us_west',
    representation: 'Us West'
  },
  {
    server: 'sl_us_east',
    representation: 'Us East'
  },
  {
    server: 'sl_europe_west',
    representation: 'Europe West'
  },
  {
    server: 'sl_singapore',
    representation: 'Singapore'
  },
  {
    server: 'sl_dubai',
    representation: 'Dubai'
  },
  {
    server: 'sl_stockholm',
    representation: 'Stockholm'
  },
  {
    server: 'sl_brazil',
    representation: 'Brazil'
  },
  {
    server: 'sl_austria',
    representation: 'Australia'
  },
  {
    server: 'sl_south_africa',
    representation: 'South Africa'
  },
  {
    server: 'sl_chile',
    representation: 'Chile'
  },
  {
    server: 'sl_peru',
    representation: 'Peru'
  },
  {
    server: 'sl_dota_region_argentina',
    representation: 'Argentina'
  },
  {
    server: 'sl_india',
    representation: 'India'
  },
  {
    server: 'sl_japan',
    representation: 'Japan'
  },
  {
    server: 'sl_taiwan',
    representation: 'Taiwan'
  }
]
