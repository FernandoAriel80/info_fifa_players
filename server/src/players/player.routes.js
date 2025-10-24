import { Router } from "express";
import PlayerController from "./player-controller.js";
import AllPlayerUseCase from "./all-player-usecase.js";
import PlayerRepository from "./player-repository.js";
import AllPlayerPaginatedUseCase from "./all-player-paginated-usecase.js";
import AllPlayerByNameUseCase from "./all-player-by-name-usecase.js";

const router = Router();
const allPlayerUseCase = new AllPlayerUseCase(new PlayerRepository());
const allPlayerPaginatedUseCase = new AllPlayerPaginatedUseCase(
  new PlayerRepository()
);
const allPlayerByNameUseCase = new AllPlayerByNameUseCase(
  new PlayerRepository()
);

const playerController = new PlayerController({
  allPlayerUseCase,
  allPlayerPaginatedUseCase,
  allPlayerByNameUseCase,
});

router.get("/", (req, res) => playerController.getall(req, res));

router.get("/pagination", (req, res) =>
  playerController.getAllPaginated(req, res)
);

router.get("/players-name", (req, res) =>
  playerController.getPlayerByName(req, res)
);

export default router;
