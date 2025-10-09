import csv from 'csv-parser'
import stream from 'stream'

export default class CsvParserService {
  
  async parseCSVBuffer(buffer) {
    return new Promise((resolve, reject) => {
      const results = [];
      const bufferStream = new stream.PassThrough();
      
      bufferStream.end(buffer);
      
      bufferStream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}