
export default class PlayerController {

    constructor(usescases) {
        this.allPlayerUseCase = usescases.allPlayerUseCase
        this.allPlayerPaginatedUseCase = usescases.allPlayerPaginatedUseCase
        this.allPlayerByNameUseCase = usescases.allPlayerByNameUseCase
    }

    async getall(req, res) {
        try {
            const players = await this.allPlayerUseCase.execute()
            res.status(200).json(players)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getAllPaginated(req, res) {
        try {

            const page = Math.max(parseInt(req.query.page) || 1)
            const size = Math.max(parseInt(req.query.size) || 40)

            const filters = {
                name: req.query.name,
                nationality: req.query.nationality,
                position: req.query.position,
                version: req.query.version,
                league: req.query.league,
                club: req.query.club,
                sortBy: req.query.sortBy,

            }

            const result = await this.allPlayerPaginatedUseCase.execute(page, size, filters)

            res.status(200).json({
                success: true,
                data: result.data,
                meta: result.meta,
            })
 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async getPlayerByName(req, res){
        try {
            const name = req.query.name
            const data = await this.allPlayerByNameUseCase.execute(name)
            res.status(200).json({
                success: true,
                data: data,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}