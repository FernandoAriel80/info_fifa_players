import { Nationality } from "./nationality-model";

export interface NationalTeam {
  nationality: Nationality;
  position: string;
  jersey_number: number | null;
}