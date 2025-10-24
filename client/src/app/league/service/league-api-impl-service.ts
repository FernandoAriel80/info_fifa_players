import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { League } from '../../shared/models/league-model';
import { ApiSimpleResponseDto } from '../../shared/dto/api-simple-response-dto';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueApiImplService {
   private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getLeagues(): Observable<ApiSimpleResponseDto<League[]>> {
      return this.http.get<ApiSimpleResponseDto<League[]>>(`${this.apiUrl}/leagues/`);
    }
}
