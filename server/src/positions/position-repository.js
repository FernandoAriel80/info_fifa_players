import { Position } from '../shared/models/Position.js'
import { PlayerPosition } from '../shared/models/PlayerPosition.js'

export default class PositionRepository {

  async all() {
    return await Position.findAll({
      attributes: ['id', 'name']
    })
  }

  async bulkCreate(id, datas, options = {}) {
    const normalizeDatas = datas.map(p => p.trim()).filter(p => p);

    const dataRelations = [];

    for (const dataName of normalizeDatas) {
      // Find or create each position
      const [data] = await Position.findOrCreate({
        where: { name: dataName },
        defaults: { name: dataName },
        ...options
      });

      dataRelations.push({
        player_id: id,
        position_id: data.id
      });
    }

    // Create all relationships
    await PlayerPosition.bulkCreate(dataRelations, {
      ...options,
      ignoreDuplicates: true
    });

    return dataRelations;
  }
}