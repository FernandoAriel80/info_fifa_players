import { Router } from 'express';
import playerRouter from './players/playerRouter'

const router = Router()
router.use("/players", playerRouter)

export default router