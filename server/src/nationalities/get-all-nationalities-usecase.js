export default class GetAllNationalityUsecase {
    constructor(nationaliyRepository){
        this.nationaliyRepository = nationaliyRepository
    }

    async execute(){
        return await this.nationaliyRepository.all()
    }
}