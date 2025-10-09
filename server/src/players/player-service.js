
export default class PlayerService {
    
    constructor(repository){
        this.repository = repository
    }

    async createPlayer(){
        const result = await this.repository.create()
        return { status: 200, message: "created player" }
    }
      
}