export default class GetAllClubUseCase {
    constructor(leagueRepository){
        this.leagueRepository = leagueRepository
    }

    async execute() {
        return this.leagueRepository.all()
    }
}