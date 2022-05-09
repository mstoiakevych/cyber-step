import {Player} from "./player";

export interface Match {
  id: number;
  name: string;
  gameMode: GameMode;
  matchMode: DotaMatchMode;
  gameState: GameState;
  server: DotaServerType;
  lobbyName: string;
  lobbyPassword: string;
  totalPlayers: number;
  joinedPlayers: number;
  players: Player[]
}

export interface CreateMatch {
  Name: string;
  GameMode: GameMode;
  Server: DotaServerType;
  MatchMode: DotaMatchMode;
  Password: string;
}

export interface CreatedMatch {
  matchId: number,
  playerId: number
}

export enum GameMode {
  OneVsOne,
  TwoVsTwo,
  FiveVsFive
}

export interface Representation {
  value: any
  representation: string
}

export const gameModeRepresentations: Representation[] = [
  {
    value: GameMode.OneVsOne,
    representation: 'One Vs One'
  },
  {
    value: GameMode.TwoVsTwo,
    representation: 'Two Vs Two'
  },
  {
    value: GameMode.FiveVsFive,
    representation: 'Five Vs Five'
  }
]

export enum GameState {
  Lobby,
  Active,
  Ended
}

export const gameStateRepresentations: Representation[] = [
  {
    value: GameState.Lobby,
    representation: 'Lobby'
  },
  {
    value: GameState.Active,
    representation: 'Active'
  },
  {
    value: GameState.Ended,
    representation: 'Ended'
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

export const serverRepresentations: Representation[] = [
  {
    value: 'sl_us_west',
    representation: 'Us West'
  },
  {
    value: 'sl_us_east',
    representation: 'Us East'
  },
  {
    value: 'sl_europe_west',
    representation: 'Europe West'
  },
  {
    value: 'sl_singapore',
    representation: 'Singapore'
  },
  {
    value: 'sl_dubai',
    representation: 'Dubai'
  },
  {
    value: 'sl_stockholm',
    representation: 'Stockholm'
  },
  {
    value: 'sl_brazil',
    representation: 'Brazil'
  },
  {
    value: 'sl_austria',
    representation: 'Australia'
  },
  {
    value: 'sl_south_africa',
    representation: 'South Africa'
  },
  {
    value: 'sl_chile',
    representation: 'Chile'
  },
  {
    value: 'sl_peru',
    representation: 'Peru'
  },
  {
    value: 'sl_dota_region_argentina',
    representation: 'Argentina'
  },
  {
    value: 'sl_india',
    representation: 'India'
  },
  {
    value: 'sl_japan',
    representation: 'Japan'
  },
  {
    value: 'sl_taiwan',
    representation: 'Taiwan'
  }
]

  export type DotaMatchMode =
  "gm_all_pick"
  | "gm_captains_mode"
  | "gm_random_draft"
  | "gm_single_draft"
  | "gm_all_random"
  | "gm_reverse_captains_mode"
  | "gm_mid_only_mode"
  | "gm_least_played"
  | "gm_new_player_mode"
  | "gm_captains_draft"
  | "gm_ability_draft"
  | "gm_all_random_death_match"
  | "gm_1v1_solo_mid"
  | "gm_ranked_all_pick"
  | "gm_turbo"


export const matchModeRepresentations: Representation[] = [
  {
    value: "gm_all_pick",
    representation: "All Pick"
  },
  {
    value: "gm_captains_mode",
    representation: "Captains Mode"
  },
  {
    value: "gm_random_draft",
    representation: "Random Draft"
  },
  {
    value: "gm_single_draft",
    representation: "Single Draft"
  },
  {
    value: "gm_all_random",
    representation: "All Random"
  },
  {
    value: "gm_reverse_captains_mode",
    representation: "Reverse Captains Mode"
  },
  {
    value: "gm_mid_only_mode",
    representation: "Mid Only Mode"
  },
  {
    value: "gm_least_played",
    representation: "Least Played"
  },
  {
    value: "gm_new_player_mode",
    representation: "New Player Mode"
  },
  {
    value: "gm_captains_draft",
    representation: "Captains Draft"
  },
  {
    value: "gm_ability_draft",
    representation: "Ability Draft"
  },
  {
    value: "gm_all_random_death_match",
    representation: "All Random Death Match"
  },
  {
    value: "gm_1v1_solo_mid",
    representation: "1v1 Solo Mid"
  },
  {
    value: "gm_ranked_all_pick",
    representation: "Ranked All Pick"
  },
  {
    value: "gm_turbo",
    representation: "Turbo"
  }
]
