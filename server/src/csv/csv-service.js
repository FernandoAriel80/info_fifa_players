import CsvProcessUseCase from './csv-process-usecase'
import CsvParserService from './csv-parcer-service'

class CSVProcessingService {
  constructor(repositories) {
    this.csvParserService = new CsvParserService()
    this.csvProcessUseCase = new CsvProcessUseCase(
      repositories.playerRepository,
      repositories.clubRepository,
      repositories.nationalityRepository,
      repositories.playerStatsRepository,
      repositories.leagueRepository,
      repositories.nationalityTeamRepository
    )
  }

  async processCSVFile(fileBuffer) {
    try {
      // Parsear CSV
      const csvData = await this.csvParserService.parseCSVBuffer(fileBuffer);
      
      // Procesar datos
      const result = await this.processCSVUseCase.execute(csvData);
      
      return result;
    } catch (error) {
      throw new Error(`CSV processing failed: ${error.message}`);
    }
  }
}

module.exports = CSVProcessingService;