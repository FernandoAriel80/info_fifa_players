import { Router } from "express"
import PositionController from "./position-controller.js"
import GetAllPositionUseCase from "./get-all-position-usecase.js"
import PositionRepository from "./position-repository.js"

const positionController = new PositionController(new GetAllPositionUseCase(new PositionRepository()))
const router = Router()

router.get('/', (req, res) => positionController.all(req, res))

export default router