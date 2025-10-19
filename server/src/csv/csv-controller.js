import { Parser } from "json2csv";

export default class CsvController {
  constructor(createCsvUseCase, allPlayerPaginatedUseCase) {
    this.createCsvUseCase = createCsvUseCase;
    this.allPlayerPaginatedUseCase = allPlayerPaginatedUseCase;
  }

  async uploadCsv(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
      }

      const result = await this.createCsvUseCase.execute(req.file.path);

      res.json({
        success: true,
        data: result,
        message: "CSV processed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /* ///////////////// */

  async exportPlayersCSV(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const size = Math.max(parseInt(req.query.size) || 20, 1);
      const filters = {
        name: req.query.name,
        nationality: req.query.nationality,
        position: req.query.position,
        version: req.query.version,
        club: req.query.club,
        sortBy: req.query.sortBy,
      };
      const players = await this.allPlayerPaginatedUseCase.execute(
        page,
        size,
        filters
      );

      const filteredPlayers = players.data;
      const mappedPlayers = filteredPlayers.map((player) => ({
        player_id: player.id,
        player_url: player.player_url,
        fifa_version: player.fifa_version,
        fifa_update: player.fifa_update,
        fifa_update_date: player.fifa_update_date,
        short_name: player.short_name,
        long_name: player.long_name,
        player_positions: player.positions?.map((p) => p.name).join(", ") || "",
        overall: player.stats?.overall || "",
        potential: player.stats?.potential || "",
        value_eur: player.value_eur,
        wage_eur: player.wage_eur,
        age: player.age,
        dob: player.dob,
        height_cm: player.height_cm,
        weight_kg: player.weight_kg,
        league_id: player.clubContracts?.[0]?.league?.id || "",
        league_name: player.clubContracts?.[0]?.league?.name || "",
        league_level: player.clubContracts?.[0]?.level || "",
        club_team_id: player.clubContracts?.[0]?.club_id || "",
        club_name: player.clubContracts?.[0]?.name || "",
        club_position: player.clubContracts?.[0]?.position || "",
        club_jersey_number: player.clubContracts?.[0]?.jersey_number || "",
        club_loaned_from: player.clubContracts?.[0]?.loaned_from || "",
        club_joined_date: player.clubContracts?.[0]?.joined_date || "",
        club_contract_valid_until_year:
          player.clubContracts?.[0]?.contract_valid_until_year || "",
        nationality_id: player.nationalTeams?.[0]?.id || "",
        nationality_name: player.nationalTeams?.[0]?.name || "",
        nation_team_id: player.nationalTeams?.[0]?.id || "",
        nation_position: player.nationalTeams?.[0]?.position || "",
        nation_jersey_number: player.nationalTeams?.[0]?.jersey_number || "",
        preferred_foot: player.preferred_foot,
        weak_foot: player.weak_foot,
        skill_moves: player.skill_moves,
        international_reputation: player.international_reputation,
        work_rate: player.work_rate,
        body_type: player.body_type,
        real_face: player.player_face_url ? "Yes" : "No",
        release_clause_eur: player.release_clause_eur || "",
        player_tags: player.tags?.map((t) => `#${t.name}`).join(", ") || "",
        player_traits: player.traits?.map((t) => t.name).join(", ") || "",
        pace: player.stats?.pace || "",
        shooting: player.stats?.shooting || "",
        passing: player.stats?.passing || "",
        dribbling: player.stats?.dribbling || "",
        defending: player.stats?.defending || "",
        physic: player.stats?.physic || "",
        attacking_crossing: player.stats?.attacking_crossing || "",
        attacking_finishing: player.stats?.attacking_finishing || "",
        attacking_heading_accuracy:
          player.stats?.attacking_heading_accuracy || "",
        attacking_short_passing: player.stats?.attacking_short_passing || "",
        attacking_volleys: player.stats?.attacking_volleys || "",
        skill_dribbling: player.stats?.skill_dribbling || "",
        skill_curve: player.stats?.skill_curve || "",
        skill_fk_accuracy: player.stats?.skill_fk_accuracy || "",
        skill_long_passing: player.stats?.skill_long_passing || "",
        skill_ball_control: player.stats?.skill_ball_control || "",
        movement_acceleration: player.stats?.movement_acceleration || "",
        movement_sprint_speed: player.stats?.movement_sprint_speed || "",
        movement_agility: player.stats?.movement_agility || "",
        movement_reactions: player.stats?.movement_reactions || "",
        movement_balance: player.stats?.movement_balance || "",
        power_shot_power: player.stats?.power_shot_power || "",
        power_jumping: player.stats?.power_jumping || "",
        power_stamina: player.stats?.power_stamina || "",
        power_strength: player.stats?.power_strength || "",
        power_long_shots: player.stats?.power_long_shots || "",
        mentality_aggression: player.stats?.mentality_aggression || "",
        mentality_interceptions: player.stats?.mentality_interceptions || "",
        mentality_positioning: player.stats?.mentality_positioning || "",
        mentality_vision: player.stats?.mentality_vision || "",
        mentality_penalties: player.stats?.mentality_penalties || "",
        mentality_composure: player.stats?.mentality_composure || "",
        defending_marking_awareness:
          player.stats?.defending_marking_awareness || "",
        defending_standing_tackle:
          player.stats?.defending_standing_tackle || "",
        defending_sliding_tackle: player.stats?.defending_sliding_tackle || "",
        goalkeeping_diving: player.stats?.goalkeeping_diving || "",
        goalkeeping_handling: player.stats?.goalkeeping_handling || "",
        goalkeeping_kicking: player.stats?.goalkeeping_kicking || "",
        goalkeeping_positioning: player.stats?.goalkeeping_positioning || "",
        goalkeeping_reflexes: player.stats?.goalkeeping_reflexes || "",
        goalkeeping_speed: player.stats?.goalkeeping_speed || "",
        ls: player.stats?.ls || "",
        st: player.stats?.st || "",
        rs: player.stats?.rs || "",
        lw: player.stats?.lw || "",
        lf: player.stats?.lf || "",
        cf: player.stats?.cf || "",
        rf: player.stats?.rf || "",
        rw: player.stats?.rw || "",
        lam: player.stats?.lam || "",
        cam: player.stats?.cam || "",
        ram: player.stats?.ram || "",
        lm: player.stats?.lm || "",
        lcm: player.stats?.lcm || "",
        cm: player.stats?.cm || "",
        rcm: player.stats?.rcm || "",
        rm: player.stats?.rm || "",
        lwb: player.stats?.lwb || "",
        ldm: player.stats?.ldm || "",
        cdm: player.stats?.cdm || "",
        rdm: player.stats?.rdm || "",
        rwb: player.stats?.rwb || "",
        lb: player.stats?.lb || "",
        lcb: player.stats?.lcb || "",
        cb: player.stats?.cb || "",
        rcb: player.stats?.rcb || "",
        rb: player.stats?.rb || "",
        gk: player.stats?.gk || "",
        player_face_url: player.player_face_url,
      }));

      const parser = new Parser();
      const csv = parser.parse(mappedPlayers);

      res.header("Content-Type", "text/csv");
      res.attachment("players_filtered.csv");
      return res.send(csv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al exportar jugadores" });
    }
  }
}
