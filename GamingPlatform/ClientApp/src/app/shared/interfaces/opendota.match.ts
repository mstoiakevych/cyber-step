export interface OpenDotaMatch {
  match_id: number,
  player_slot: number,
  radiant_win: boolean,
  duration: number,
  game_mode: number,
  lobby_type: number,
  hero_id: number,
  start_time?: number,
  start_date?: Date,
  version?: number,
  kills: number,
  deaths: number,
  assists: number,
  skill: number,
  leaver_status: number,
  party_size?: number,

  date: string
}
