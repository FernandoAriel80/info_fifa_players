import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Nationality } from '../../shared/models/nationality-model';
import { ApiSimpleResponseDto } from '../../shared/dto/api-simple-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalityApiImplService {
   private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getNationalities(): Observable<ApiSimpleResponseDto<Nationality[]>> {
      return this.http.get<ApiSimpleResponseDto<Nationality[]>>(`${this.apiUrl}/nationalities/`);
    }
}
