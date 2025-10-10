import { Router } from 'express'
import playerRouter from './players/player.routes.js'
import csvRouter from './csv/csv.routes.js'
const router = Router()

router.use('/players', playerRouter)

router.use('/csv',csvRouter)

export default router