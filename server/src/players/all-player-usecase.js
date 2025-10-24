export default class AllPlayerUseCase {
    constructor(playerRepository) {
        this.playerRepository = playerRepository
    }
    execute() {
        return this.playerRepository.all()
     }
}