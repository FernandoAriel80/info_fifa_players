import { Player } from '../shared/models/Player.js'

export default class PlayerRepository {
  async create(data, options = {}) {
    return await Player.create(data, options);
  }

  async findById(id) {
    return await Player.findOne({ where: { player_id: id } });
  }

}
