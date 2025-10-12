export default class AllPlayerPaginatedUseCase {
    constructor(playerRepository) {
        this.playerRepository = playerRepository
    }
    execute(page, size, filters) {
        return this.playerRepository.findAllPaginated(page, size, filters)
     }
}