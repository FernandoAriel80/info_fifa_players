export default class PositionController {
    constructor(getallPositionUseCase) {
        this.getallPositionUseCase = getallPositionUseCase
    }

    async all(req, res) {

        try {
            const data = await this.getallPositionUseCase.execute()
            res.status(200).json({
                success: true,
                data: data,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}