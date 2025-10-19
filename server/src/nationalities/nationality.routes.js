import { Router } from 'express'
import NationalityController from './nationality-controller.js'
import GetAllNationalityUsecase from './get-all-nationalities-usecase.js'
import NationalityRepository from './nationality-repository.js'

const nationalityController = new NationalityController(new GetAllNationalityUsecase(new NationalityRepository()))
const router = Router()

router.get('/', (req, res) => nationalityController.all(req, res))

export default router