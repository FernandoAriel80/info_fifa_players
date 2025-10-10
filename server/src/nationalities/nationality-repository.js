import { Nationality } from '../shared/models/Nationality.js'

export default class NationalityRepository {
    async create(data, options = {}) {
        return await Nationality.create(data, options);
    }
    async findById(id) {
        return await Nationality.findOne({ where: { player_id: id } });
    }

}