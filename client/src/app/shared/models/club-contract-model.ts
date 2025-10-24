import { Club } from "./club-model";

export interface ClubContract {
  id: number;
  player_id: number;
  club_id: number;
  level: number;
  position: string;
  jersey_number: number;
  wage_eur: string;
  value_eur: string;
  club: Club;
}