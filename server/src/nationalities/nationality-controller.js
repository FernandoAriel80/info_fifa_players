export default class NationalityController {
    constructor(getAllNationalitiUseCase) {
        this.getAllNationalitiUseCase = getAllNationalitiUseCase
    }

    async all(req, res) {
        try {
            const data = await this.getAllNationalitiUseCase.execute()
            res.status(200).json({
                success: true,
                data: data,
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}