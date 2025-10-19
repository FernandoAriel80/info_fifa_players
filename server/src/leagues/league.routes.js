import { Router } from "express";
import LeagueController from "./league-controllet.js";
import GetAllLeagueUsecase from "./get-all-leagues-usecase.js";
import LeagueRepository from "./league-repository.js";

const leagueController = new LeagueController(new GetAllLeagueUsecase(new LeagueRepository()))
const router = Router()

router.get('/', (req, res) => leagueController.all(req, res))
export default router