
export default class CsvController {
  constructor(csvService) {
    this.csvService = csvService;
  }

  async uploadCsv(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        })
      }

      const result = await this.csvService.processCSVFile(req.file.buffer)
      
      res.json({
        success: true,
        data: result,
        message: 'CSV processed successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
}