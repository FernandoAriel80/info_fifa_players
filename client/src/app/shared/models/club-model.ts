import { League } from "./league-model";

export interface Club {
    id: number;
    name: string;
    league: League[];
}