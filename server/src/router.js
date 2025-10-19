import { Router } from 'express'
import playerRoutes from './players/player.routes.js'
import csvRoutes from './csv/csv.routes.js'
import nationalityRoutes from './nationalities/nationality.routes.js'
import clubRoutes from './clubs/club.routes.js'
import leagueRoutes from './leagues/league.routes.js'
import positionRoutes from './positions/position.routes.js'
const router = Router()

router.use('/players', playerRoutes)

router.use('/nationalities', nationalityRoutes)
router.use('/clubs', clubRoutes)
router.use('/leagues', leagueRoutes)
router.use('/positions', positionRoutes)

router.use('/csv',csvRoutes)

export default router