import { League } from '../shared/models/League.js'

export default class LeagueRepository {
    async all() {
        return await League.findAll({
            attributes: ['name'],
            group: ['name'],
            order: [['name', 'ASC']]
        })
    }
    async create(data, options = {}) {
        return await League.create(data, options);
    }
    async findById(id) {
        return await League.findOne({ where: { player_id: id } });
    }
}