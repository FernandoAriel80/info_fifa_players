import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { PlayerFilterDto } from '../dto/player-filter-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvApiImplService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUploadCSV(selectedFile: File | null) {
    if (!selectedFile) {
      alert('Selecciona un archivo primero.');
      return;
    }
    const formData = new FormData();
    formData.append('csvFile', selectedFile, selectedFile.name);

    this.http
      .post(`${this.apiUrl}/csv/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const percentDone = Math.round((event.loaded / event.total) * 100);
            console.log(`Subida: ${percentDone}%`);
          } else if (event.type === HttpEventType.Response) {
            console.log('CSV importado con éxito', event.body);
          }
        },
        error: (err) => {
          console.error('Error importando CSV', err);
        },
      });
  }

  // "ExportPlayersToCSVUseCase"
  downloadCSV(filters: PlayerFilterDto): Observable<Blob> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.club) params = params.set('club', filters.club);
    if (filters.position) params = params.set('position', filters.position);
    if (filters.version) params = params.set('version', filters.version);
    if (filters.nationality) params = params.set('nationality', filters.nationality);
    if (filters.league) params = params.set('league', filters.league);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);

    return this.http.get(`${this.apiUrl}/csv/export`, {
      params,
      responseType: 'blob',
    });
  }
}
