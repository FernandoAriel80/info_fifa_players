import { Router } from "express";

const router = Router()
router.use("/", () => console.log("estas en la raiz de players"))

export default router