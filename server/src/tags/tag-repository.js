import { Tag } from '../shared/models/Tag.js'
import { PlayerTag } from '../shared/models/PlayerTag.js'

export default class TagRepository {
  async bulkCreate(id, datas, options = {}) {
    const normalizeDatas = datas.map(p => p.trim()).filter(p => p);

    const dataRelations = [];

    for (const dataName of normalizeDatas) {
      // Find or create each position
      const [data] = await Tag.findOrCreate({
        where: { name: dataName },
        defaults: { name: dataName },
        ...options
      });

      dataRelations.push({
        player_id: id,
        tag_id: data.id
      });
    }

    // Create all relationships
    await PlayerTag.bulkCreate(dataRelations, {
      ...options,
      ignoreDuplicates: true
    });

    return dataRelations;
  }
}