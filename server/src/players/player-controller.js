
export default class PlayerController {

    constructor(usescases) {
        this.allPlayerUseCase = usescases.allPlayerUseCase
        this.allPlayerPaginatedUseCase = usescases.allPlayerPaginatedUseCase
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
            /* */
            /*
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10

            // Extraer filtros del query
             const filters = {
                name: req.query.name,
                nationality: req.query.nationality,
                position: req.query.position,
                club: req.query.club,
                minAge: req.query.minAge,
                maxAge: req.query.maxAge,
                minOverall: req.query.minOverall
            } */
            const page = Math.max(parseInt(req.query.page) || 1, 1)
            const size = Math.max(parseInt(req.query.size) || 10, 1)

            const filters = {
                name: req.query.name,
                nationality: req.query.nationality,
                position: req.query.position,
                club: req.query.club,
                trait: req.query.trait,
                age: req.query.age,
                tags: req.query.tags,
                traits: req.query.traits,
                sortBy: req.query.sortBy,
                /*  minAge: req.query.minAge,
                 maxAge: req.query.maxAge,
                 minOverall: req.query.minOverall */
            }

            const result = await this.allPlayerPaginatedUseCase.execute(page, size, filters)

            res.status(200).json({
                success: true,
                data: result.data,
                meta: result.meta,
            })
            /* 
                        res.status(200).json({
                            success: true,
                            data: result.players,
                            pagination: result.pagination,
                            filters,
                        }) */
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    /*  create = (req, res) => {
         try {
             const playerData = req.body
             const newPlayer = this.playerService.createPlayer(playerData)
             res.status(201).json(newPlayer)
         } catch (error) {
             res.status(500).json({ error: error.message })
         }
     } */
}