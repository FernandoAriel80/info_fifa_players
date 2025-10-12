import { Router } from 'express'
import PlayerController from './player-controller.js'
import AllPlayerUseCase from './all-player-usecase.js'
import PlayerRepository from './player-repository.js'
import AllPlayerPaginatedUseCase from './all-player-paginated-usecase.js'

const router = Router()
const allPlayerUseCase = new AllPlayerUseCase(new PlayerRepository())
const allPlayerPaginatedUseCase = new AllPlayerPaginatedUseCase(new PlayerRepository())

const playerController = new PlayerController({ allPlayerUseCase, allPlayerPaginatedUseCase })

router.get('/', (req, res) => playerController.getall(req, res))

router.get('/pagination', (req, res) => playerController.getAllPaginated(req, res))


//router.post('/', playerController.create())

export default router