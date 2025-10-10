
export default class PlayerController {
    
    constructor(playerService){
        this.playerService = playerService
    }
    create = (req, res) => {
        try {
            const playerData = req.body
            const newPlayer = this.playerService.createPlayer(playerData)
            res.status(201).json(newPlayer)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}