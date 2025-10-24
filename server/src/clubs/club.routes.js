import { Router } from "express"
import ClubController from "./club-controller.js"
import GetAllClubUseCase from "./get-all-club-usecase.js"
import ClubRepository from "./club-repository.js"

const clubController = new ClubController(new GetAllClubUseCase(new ClubRepository()))
const router = Router()

router.get('/', (req, res) => clubController.all(req, res))
export default router