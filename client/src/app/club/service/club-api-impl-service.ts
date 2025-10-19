import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Club } from '../../shared/models/club-model';
import { ApiSimpleResponseDto } from '../../shared/dto/api-simple-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubApiImplService {
   private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getClubs(): Observable<ApiSimpleResponseDto<Club[]>> {
      return this.http.get<ApiSimpleResponseDto<Club[]>>(`${this.apiUrl}/clubs/`);
    }
}
