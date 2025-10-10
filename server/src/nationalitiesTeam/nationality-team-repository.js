import { NationalTeam } from '../shared/models/NationalTeam.js'

export default class NationalityTeamRepository {
    async create(data, options = {}) {
        return await NationalTeam.create(data, options);
    }
    async findById(id) {
        return await NationalTeam.findOne({ where: { player_id: id } });
    }

}