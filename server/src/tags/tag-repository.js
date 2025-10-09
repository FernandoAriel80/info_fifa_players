
export default class TagRepository {
    async saveTags(playerId, tags) {
        const tagRecords = tags.map(tagName => ({
            player_id: playerId,
            name: tagName
        }));

        return await PlayerTag.bulkCreate(tagRecords);
    }

}