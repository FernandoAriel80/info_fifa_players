class ProcessCSVUseCase {
  constructor(
    playerRepository,
    clubRepository, 
    nationalityRepository,
    playerStatsRepository
  ) {
    this.playerRepository = playerRepository;
    this.clubRepository = clubRepository;
    this.nationalityRepository = nationalityRepository;
    this.playerStatsRepository = playerStatsRepository;
  }

  async execute(csvData) {
    try {
      const processedData = this.parseCSVData(csvData);
      const validationErrors = this.validateData(processedData);
      
      if (validationErrors.length > 0) {
        throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
      }

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
        player_id: parseInt(row.player_id),
        player_url: row.player_url,
        fifa_version: parseInt(row.fifa_version),
        fifa_update: parseInt(row.fifa_update),
        fifa_update_date: row.fifa_update_date ? new Date(row.fifa_update_date) : null,
        short_name: row.short_name,
        long_name: row.long_name,
        age: parseInt(row.age),
        dob: row.dob ? new Date(row.dob) : null,
        height_cm: parseInt(row.height_cm),
        weight_kg: parseInt(row.weight_kg),
        preferred_foot: row.preferred_foot,
        weak_foot: parseInt(row.weak_foot),
        skill_moves: parseInt(row.skill_moves),
        international_reputation: parseInt(row.international_reputation),
        work_rate: row.work_rate,
        body_type: row.body_type,
        real_face: row.real_face === 'Yes',
        release_clause_eur: parseFloat(row.release_clause_eur) || null,
        player_face_url: row.player_face_url
      },
      club: {
        club_team_id: parseInt(row.club_team_id),
        club_name: row.club_name,
        league_id: parseInt(row.league_id),
        league_name: row.league_name,
        league_level: parseInt(row.league_level),
        club_position: row.club_position,
        club_jersey_number: parseInt(row.club_jersey_number) || null,
        club_loaned_from: row.club_loaned_from,
        club_joined_date: row.club_joined_date ? new Date(row.club_joined_date) : null,
        club_contract_valid_until_year: parseInt(row.club_contract_valid_until_year) || null,
        wage_eur: parseFloat(row.wage_eur) || null,
        value_eur: parseFloat(row.value_eur) || null
      },
      nationality: {
        nationality_id: parseInt(row.nationality_id),
        nationality_name: row.nationality_name,
        nation_team_id: parseInt(row.nation_team_id),
        nation_position: row.nation_position,
        nation_jersey_number: parseInt(row.nation_jersey_number) || null
      },
      stats: {
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
        // ... más stats
      },
      positions: row.player_positions ? row.player_positions.split(',').map(p => p.trim()) : [],
      tags: row.player_tags ? row.player_tags.replace(/#/g, '').split(',').map(t => t.trim()) : [],
      traits: row.player_traits ? row.player_traits.split(',').map(t => t.trim()) : []
    }));
  }

  validateData(processedData) {
    const errors = [];
    
    processedData.forEach((data, index) => {
      if (!data.player.player_id) errors.push(`Row ${index}: player_id is required`);
      if (!data.player.short_name) errors.push(`Row ${index}: short_name is required`);
      if (!data.player.long_name) errors.push(`Row ${index}: long_name is required`);
    });
    
    return errors;
  }

  async saveAllData(processedData) {
    const players = [];
    
    for (const data of processedData) {
      // Guardar o actualizar club
      const club = await this.clubRepository.findOrCreate(data.club);
      
      // Guardar o actualizar nacionalidad
      const nationality = await this.nationalityRepository.findOrCreate(data.nationality);
      
      // Guardar jugador
      const player = await this.playerRepository.create({
        ...data.player,
        club_id: club.id,
        nationality_id: nationality.id
      });
      
      // Guardar estadísticas
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

module.exports = ProcessCSVUseCase;