import { Club } from '../shared/models/Club.js'
import { ClubContract } from '../shared/models/ClubContract.js';

export default class ClubRepository {
    async all() {
        return await Club.findAll({
            attributes: ['name'],
            group: ['name'],
            order: [['name', 'ASC']]
        })
    }
    async create(data, options = {}) {
        return await Club.create(data, options);
    }
    async findById(id) {
        return await Club.findOne({ where: { player_id: id } });
    }

    async bulkCreate(id, datas, options = {}) {
        const normalizeDatas = datas.map(p => p.trim()).filter(p => p);

        const dataRelations = [];

        for (const dataName of normalizeDatas) {
            // Find or create each position
            const [data] = await Club.findOrCreate({
                where: { name: dataName },
                defaults: { name: dataName },
                ...options
            });

            dataRelations.push({
                player_id: id,
                club_id: data.id
            });
        }
        // Create all relationships
        await ClubContract.bulkCreate(dataRelations, {
            ...options,
            ignoreDuplicates: true
        });

        return dataRelations;
    }
}