


export default class CsvService {
  constructor(repositories) {
    this.csvParserService = new CsvParserService()
    this.csvProcessUseCase = new CreateCsvUseCase(
      repositories.playerRepository,
      repositories.clubRepository,
      repositories.nationalityRepository,
      repositories.playerStatsRepository,
      repositories.leagueRepository,
      repositories.nationalityTeamRepository
    )
  }

  async processCSVFile(filePath) {
    try {
      // Parsear CSV
      //const csvData = await this.csvParserService.parseCSVFile(filePath);
      // Procesar datos
      //const result = await this.csvProcessUseCase.execute(csvData);
      console.log(result)
      
      return result
    } catch (error) {
      throw new Error(`CSV processing failed: ${error.message}`);
    }
  }
}