import { Trait } from '../shared/models/Trait.js'
import { PlayerTrait } from '../shared/models/PlayerTrait.js';

export default class TraitRepository {
  async bulkCreate(id, datas, options = {}) {
    const normalizeDatas = datas.map(p => p.trim()).filter(p => p);

    const dataRelations = [];

    for (const dataName of normalizeDatas) {
      // Find or create each position
      const [data] = await Trait.findOrCreate({
        where: { name: dataName },
        defaults: { name: dataName },
        ...options
      });

      dataRelations.push({
        player_id: id,
        trait_id: data.id
      });
    }

    // Create all relationships
    await PlayerTrait.bulkCreate(dataRelations, {
      ...options,
      ignoreDuplicates: true
    });

    return dataRelations;
  }
}
