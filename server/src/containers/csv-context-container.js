//services
import ParserCsvFileService from '../csv/parcer-csv-file-service.js'
import ParseCsvDataService from '../csv/parse-csv-data-service.js'

//repositories
import LeagueRepository from '../leagues/league-repository.js'
import ClubRepository from '../clubs/club-repository.js'
import NationalityRepository from '../nationalities/nationality-repository.js'
import PlayerRepository from '../players/player-repository.js'
import ClubContractRepository from '../clubContract/club-contract-repository.js'
import NationalTeamRepository from '../nationalitiesTeam/nationality-team-repository.js'
import PlayerStatsRepository from '../playerStats/player-stats-repository.js'
import PositionRepositor from '../positions/position-repository.js'
import TagRepository from '../tags/tag-repository.js'
import TraitRepository from '../traits/trait-repository.js'

import PlayerBulkCsvRepository from '../csv/player-bulk-csv-repository.js'

//usecases
import CreateCsvUseCase from '../csv/create-csv-usecase.js'

//controllers
import CsvController from '../csv/csv-controller.js'

export default class CsvContextContainer {
  constructor() {
    //services
    this.parserCsvFileService = new ParserCsvFileService()
    this.parseCsvDataService = new ParseCsvDataService()

    //repositories
    this.leagueRepository = new LeagueRepository()
    this.clubRepository = new ClubRepository()
    this.nationalityRepository = new NationalityRepository()
    this.playerRepository = new PlayerRepository()
    this.clubContractRepository = new ClubContractRepository()
    this.nationalTeamRepository = new NationalTeamRepository()
    this.playerStatsRepository = new PlayerStatsRepository()
    this.positionRepositor = new PositionRepositor()
    this.tagRepository = new TagRepository()
    this.traitRepository = new TraitRepository()
    
    this.playerBulkCsvRepository = new PlayerBulkCsvRepository(
      {
        leagueRepository: this.leagueRepository,
        clubRepository: this.clubRepository,
        nationalityRepository: this.nationalityRepository,
        playerRepository: this.playerRepository,
        clubContractRepository: this.clubContractRepository,
        nationalTeamRepository: this.nationalTeamRepository,
        playerStatsRepository: this.playerStatsRepository,
        positionRepositor: this.positionRepositor,
        tagRepository: this.tagRepository,
        traitRepository: this.traitRepository,

      }
    )

    //usecases

    this.createCsvUseCase = new CreateCsvUseCase(
      this.playerBulkCsvRepository,
      this.parserCsvFileService,
      this.parseCsvDataService,
    )
  }

  // controller inyectado
  getCsvController() {
    return new CsvController(this.createCsvUseCase);
  }
}