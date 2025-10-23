import { Router } from "express";
import UserController from "./user-constroller.js";
import RegisterUseCase from "./register-usecase.js";
import {
  registerValidation,
  handleValidationErrors,
} from "./middleware/register-validation-middleware.js";
import UserRepository from "./user-repository.js";
const userController = new UserController(new RegisterUseCase(new UserRepository()));

const router = Router();

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  (req, res) => userController.register(req, res)
);

export default router
