import { Router } from 'express';
import playerRouter from './players/playerRouter.js'

const router = Router()
router.use("/players", playerRouter)

export default router