import { Router } from 'express'
import PlayerController from './player-controller.js'

const router = Router()
const playerController = new PlayerController()

router.get('/', (req, res) => {
    console.log("estas en la raiz de players")
    res.json({ message: "Estás en la raíz de players" })
})

router.post('/', playerController.create())

export default router