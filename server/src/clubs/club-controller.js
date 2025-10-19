export default class ClubController {
    constructor(getAllClubUseCase) {
        this.getAllClubUseCase = getAllClubUseCase
    }

    async all(req, res) {
        try {

            const data = await this.getAllClubUseCase.execute()
            res.status(200).json({
                success: true,
                data: data,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}