import { Club } from '../shared/models/Club.js'

export default class ClubRepository {
    async create(data, options = {}) {
        return await Club.create(data, options);
    }
    async findById(id) {
        return await Club.findOne({ where: { player_id: id } });
    }
}