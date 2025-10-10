// src/infrastructure/repositories/PlayerBulkRepository.js
import sequelize from '../shared/database/sequelize.js'
export default class PlayerBulkCsvRepository {
    constructor(repositories) {
        this.repositories = repositories
    }

    async saveAllPlayers(processedData) {
        return await sequelize.transaction(async (transaction) => {
            const players = []
            
            for (const data of processedData) {
                const player = await this.savePlayerWithRelations(data, transaction)
                players.push(player);
            }

            return { players };
        });
    }

    async savePlayerWithRelations(data, transaction) {
        // 1. Find or Create League
        const league = await this.repositories.leagueRepository.create(
            data.league,
            { transaction }
        );

        // 2. Create Club with league relation
        const club = await this.repositories.clubRepository.create(
            { ...data.club, league_id: league.id },
            { transaction }
        );

        // 3. Find or Create Nationality
        const nationality = await this.repositories.nationalityRepository.create(
            data.nationality,
            { transaction }
        );

        // 4. Create Player
        const player = await this.repositories.playerRepository.create(
            data.player,
            { transaction }
        );

        // 5. Create relations
        await this.repositories.clubContractRepository.create({
            ...data.ClubContract,
            player_id: player.id,
            club_id: club.id
        }, { transaction });

        await this.repositories.nationalTeamRepository.create({
            ...data.nationalityTeam,
            player_id: player.id,
            nationality_id: nationality.id
        }, { transaction });

        await this.repositories.playerStatsRepository.create({
            ...data.playerStats,
            player_id: player.id
        }, { transaction });

        // 6. Handle many-to-many relations
        await this.repositories.positionRepositor.bulkCreate(
            player.id,
            data.positions,
            { transaction }
        );

        await this.repositories.tagRepository.bulkCreate(
            player.id,
            data.tags,
            { transaction }
        );

        await this.repositories.traitRepository.bulkCreate(
            player.id,
            data.traits,
            { transaction }
        );

        return player;
    }
}