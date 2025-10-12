import { Router } from 'express'
import playerRoutes from './players/player.routes.js'
import csvRoutes from './csv/csv.routes.js'
const router = Router()

router.use('/players', playerRoutes)

router.use('/csv',csvRoutes)

export default router