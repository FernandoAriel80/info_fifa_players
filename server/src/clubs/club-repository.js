const { Club, League } = require('../database/sequelize');

class ClubRepository {
  async findOrCreate(clubData) {
    const [club] = await Club.findOrCreate({
      where: { club_team_id: clubData.club_team_id },
      defaults: {
        name: clubData.club_name,
        club_team_id: clubData.club_team_id
      },
      include: [League]
    });

    // Manejar liga
    if (clubData.league_id) {
      const [league] = await League.findOrCreate({
        where: { league_id: clubData.league_id },
        defaults: {
          name: clubData.league_name,
          level: clubData.league_level
        }
      });
      
      await club.setLeague(league);
    }

    return club;
  }
}

module.exports = ClubRepository;