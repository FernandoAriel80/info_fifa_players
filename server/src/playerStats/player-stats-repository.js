import { PlayerStats } from '../shared/models/PlayerStats.js'

export default class PlayerStatsRepository {
    async create(data, options = {}) {
        return await PlayerStats.create(data, options);
    }
    async findById(id) {
        return await PlayerStats.findOne({ where: { player_id: id } });
    }

}