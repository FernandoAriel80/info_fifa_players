
export default class PositionRepository {

    async savePositions(playerId, positions) {
        const positionRecords = positions.map(position => ({
            player_id: playerId,
            position: position.trim()
        }));

        return await PlayerPosition.bulkCreate(positionRecords);
    }

}