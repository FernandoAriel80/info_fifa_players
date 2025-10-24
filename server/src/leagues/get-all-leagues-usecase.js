export default class GetAllLeagueUsecase {
    constructor(nationalityRepository) {
        this.nationalityRepository = nationalityRepository
    }
    async execute() {
        return await this.nationalityRepository.all()
    }
}