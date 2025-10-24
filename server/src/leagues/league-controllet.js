
export default class LeagueController {
    constructor(getAllLeagueUseCase) {
        this.getAllLeagueUseCase = getAllLeagueUseCase
    }

    async all(req, res) {
        try {

            const data = await this.getAllLeagueUseCase.execute()
            res.status(200).json({
                success: true,
                data: data,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}