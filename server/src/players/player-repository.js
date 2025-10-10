const { Player, PlayerPosition, PlayerTag, PlayerTrait } = require('../database/sequelize');

export default class PlayerRepository {
  async create(playerData) {
    return await Player.create(playerData);
  }

  async findByPlayerId(playerId) {
    return await Player.findOne({ where: { player_id: playerId } });
  }

  async bulkCreate(playersData) {
    return await Player.bulkCreate(playersData);
  }
}
