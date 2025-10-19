export default class GetAllPositionUseCase {
    constructor(positionRepository) {
        this.positionRepository = positionRepository
    }

    async execute() {
        return await this.positionRepository.all()
    }
}