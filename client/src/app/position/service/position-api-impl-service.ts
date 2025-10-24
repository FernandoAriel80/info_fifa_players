import { Injectable } from '@angular/core';
import { Position } from '../../shared/models/position-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiSimpleResponseDto } from '../../shared/dto/api-simple-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PositionApiImplService {
   private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPositions(): Observable<ApiSimpleResponseDto<Position[]>> {
      return this.http.get<ApiSimpleResponseDto<Position[]>>(`${this.apiUrl}/positions/`);
    }
}
