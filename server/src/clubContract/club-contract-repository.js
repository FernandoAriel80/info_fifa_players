import { ClubContract } from '../shared/models/ClubContract.js'

export default class ClubContractRepository {
    async create(data, options = {}) {
        return await ClubContract.create(data, options);
    }
    async findById(id) {
        return await ClubContract.findOne({ where: { player_id: id } });
    }

}