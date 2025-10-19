import { ClubContract } from "./club-contract-model";
import { NationalTeam } from "./national-team-model";
import { PlayerStats } from "./player-stats-model";
import { Position } from "./position-model";
import { Tag } from "./tag-model";
import { Trait } from "./traits-model";

export interface Player {
  id: number;
  fifa_version: number;
  short_name: string;
  long_name: string;
  age: number;
  dob: string;
  height_cm: number;
  weight_kg: number;
  preferred_foot: string;
  skill_moves: number;
  international_reputation: number;
  work_rate: string;
  body_type: string;
  player_url: string;
  player_face_url: string;
  
  nationalTeams: NationalTeam[];
  positions: Position[];
  tags: Tag[];
  traits: Trait[];
  stats: PlayerStats;
  clubContracts: ClubContract[];
}
