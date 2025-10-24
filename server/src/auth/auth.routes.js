import { Router } from "express";

import AuthController from "./auth-controller.js";
import {
  loginValidation,
  handleValidationErrors,
} from "./middlewares/login-validation-middleware.js";
import LoginUsecase from "./login-usecase.js";
import UserRepository from "../user/user-repository.js";
import ValidateAndRenewTokenUseCase from "./validate-and-renew-token-usecase.js";

const authController = new AuthController(
  new LoginUsecase(new UserRepository()),
  new ValidateAndRenewTokenUseCase(new UserRepository())
);
const router = Router();

router.post("/login", loginValidation, handleValidationErrors, (req, res) =>
  authController.login(req, res)
);

router.post("/refresh-token", (req, res) =>
  authController.refreshToken(req, res)
);

export default router;
