
export default class CreateCsvUseCase {
  constructor(
    playerBulkCsvRepository,
    parserCsvFileService,
    parseCsvDataService,
  ) {
    this.playerBulkCsvRepository = playerBulkCsvRepository
    this.parserCsvFileService = parserCsvFileService
    this.parseCsvDataService = parseCsvDataService
  }

  async execute(filePath) {

    const csvData = await this.parserCsvFileService.parseCSVFile(filePath)
    if (!csvData) throw new Error('Error en el parseo: parseCSVFile')

    const processedData = this.parseCsvDataService.parseCSVData(csvData);
    // ✅ SOLO PRIMEROS 20000 REGISTROS PARA PRUEBA
    //const testData = processedData.slice(0, 20000);
    // Procesar en transacción
    console.log('🎯 Use PlayerBulkCsvRepository ejecutándose...');
    //const result = await this.playerBulkCsvRepository.saveAllPlayers(testData);
    const result = await this.playerBulkCsvRepository.saveAllPlayers(processedData);
    console.log("finalizo el usecase")
    return {
      success: true,
      playersProcessed: result.players.length,
      message: `Successfully processed ${result.players.length} players`
    };

  }
}