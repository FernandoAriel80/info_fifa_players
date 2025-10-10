import Trait from ''
export default class TraitRepository {
    async saveTraits(playerId, traits) {
        const traitRecords = traits.map(traitName => ({
            player_id: playerId,
            name: traitName
        }))

        return await Trait.bulkCreate(traitRecords);
    }
}
