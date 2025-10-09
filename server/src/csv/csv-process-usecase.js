
export default class CsvProcessUseCase {
  constructor(
    playerRepository,
    clubRepository,
    nationalityRepository,
    playerStatsRepository,
    leagueRepository,
    nationalityTeamRepository
  ) {
    this.playerRepository = playerRepository
    this.clubRepository = clubRepository
    this.nationalityRepository = nationalityRepository
    this.playerStatsRepository = playerStatsRepository
    this.leagueRepository = leagueRepository
    this.nationalityTeamRepository = nationalityTeamRepository
  }

  async execute(csvData) {
    try {
      const processedData = this.parseCSVData(csvData);

      // Procesar en transacción
      const result = await this.saveAllData(processedData);

      return {
        success: true,
        playersProcessed: result.players.length,
        message: `Successfully processed ${result.players.length} players`
      };
    } catch (error) {
      throw new Error(`Process CSV failed: ${error.message}`);
    }
  }

  parseCSVData(csvData) {
    return csvData.map(row => ({
      player: {
        fifa_version: parseInt(row.fifa_version),
        short_name: row.short_name,
        long_name: row.long_name,
        age: parseInt(row.age),
        dob: row.dob,
        height_cm: parseInt(row.height_cm),
        weight_kg: parseInt(row.weight_kg),
        preferred_foot: row.preferred_foot,
        skill_moves: parseInt(row.skill_moves),
        international_reputation: parseInt(row.international_reputation),
        work_rate: row.work_rate,
        body_type: row.body_type,
        player_url: row.player_url,
        player_face_url: row.player_face_url
      },
      league: {
        name: row.league_name,
      },
      club: {
        name: row.club_name,
        //league_id: League,
      },
      nationality: {
        nationality_name: row.nationality_name,
      },
      ClubContract: {
        //player_id Player
        //club_id Club
        level: parseInt(row.league_level),
        position: row.club_position,
        jersey_number: parseInt(row.club_jersey_number) || null,
        wage_eur: parseFloat(row.wage_eur) || null,
        value_eur: parseFloat(row.value_eur) || null
      },
      nationalityTeam: {
        //player_id Player,
        //nationality_id Nacionality
        position: row.nation_position,
        jersey_number: parseInt(row.nation_jersey_number) || null
      },
      playerStats: {
        //player_id Player,
        overall: parseInt(row.overall),
        potential: parseInt(row.potential),
        pace: parseInt(row.pace),
        shooting: parseInt(row.shooting),
        passing: parseInt(row.passing),
        dribbling: parseInt(row.dribbling),
        defending: parseInt(row.defending),
        physic: parseInt(row.physic),
        attacking_crossing: parseInt(row.attacking_crossing),
        attacking_finishing: parseInt(row.attacking_finishing),
        attacking_heading_accuracy: parseInt(row.attacking_heading_accuracy),
        attacking_short_passing: parseInt(row.attacking_short_passing),
        skill_dribbling: parseInt(row.skill_dribbling),
        skill_fk_accuracy: parseInt(row.skill_fk_accuracy),
        skill_long_passing: parseInt(row.skill_long_passing),
        skill_ball_control: parseInt(row.skill_ball_control),
        movement_acceleration: parseInt(row.movement_acceleration),
        movement_sprint_speed: parseInt(row.movement_sprint_speed),
        movement_agility: parseInt(row.movement_agility),
        movement_reactions: parseInt(row.movement_reactions),
        power_shot_power: parseInt(row.power_shot_power),
        power_jumping: parseInt(row.power_jumping),
        power_stamina: parseInt(row.power_stamina),
        power_strength: parseInt(row.power_strength),
        power_long_shots: parseInt(row.power_long_shots),
        mentality_aggression: parseInt(row.mentality_aggression),
        mentality_vision: parseInt(row.mentality_vision),
        mentality_composure: parseInt(row.mentality_composure),
        defending_marking_awareness: parseInt(row.defending_marking_awareness),
        defending_standing_tackle: parseInt(row.defending_standing_tackle),
        defending_sliding_tackle: parseInt(row.defending_sliding_tackle),
        goalkeeping_diving: parseInt(row.goalkeeping_diving),
        goalkeeping_handling: parseInt(row.goalkeeping_handling),
        goalkeeping_kicking: parseInt(row.goalkeeping_kicking),
        goalkeeping_positioning: parseInt(row.goalkeeping_positioning),
        goalkeeping_reflexes: parseInt(row.goalkeeping_reflexes),
        goalkeeping_speed: parseInt(row.goalkeeping_speed),

      },
      tags: row.player_tags ? row.player_tags.replace(/#/g, '').split(',').map(t => t.trim()) : [],
      traits: row.player_traits ? row.player_traits.split(',').map(t => t.trim()) : [],
      positions: row.player_positions ? row.player_positions.split(',').map(p => p.trim()) : [],
    }));
  }

  async saveAllData(processedData) {
    const players = [];

    for (const data of processedData) {

      // Guardar jugador
      const player = await this.playerRepository.create({
        ...data.player,
        club_id: club.id,
        nationality_id: nationality.id
      })

      // Guardar league
      const league = await this.leagueRepository.create(data.league)

      // Guardar club
      const club = await this.clubRepository.create({
        ...data.club,
        league_id: league.id,
      })

      // Guardar nationality
      const nationality = await this.nationalityRepository.create(data.nationality)

      // Guardar ClubContract
      const ClubContract = await this.ClubContractRepository.create({
        ...data.ClubContract,
        player_id: player.id,
        club_id: club.id,
      })

      // Guardar o actualizar nationalityTeam
      const nationalityTeam = await this.nationalityTeamRepository.findOrCreate({
        ...data.nationalityTeam,
        player_id: player.id,
        nationality_id: nationality.id,
      })


      // Guardar playerStats
      await this.playerStatsRepository.create({
        ...data.stats,
        player_id: player.id
      });

      // Guardar posiciones
      await this.playerRepository.savePositions(player.id, data.positions);

      // Guardar tags y traits
      await this.playerRepository.saveTags(player.id, data.tags);
      await this.playerRepository.saveTraits(player.id, data.traits);

      players.push(player);
    }

    return { players };
  }
}