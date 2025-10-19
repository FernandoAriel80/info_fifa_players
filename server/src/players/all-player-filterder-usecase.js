export default class AllPlayerFilterderUseCase {
    constructor(playerRepository) {
        this.playerRepository = playerRepository
    }
    execute(filters) {
        return this.playerRepository.findAllFiltered(filters)
     }
}