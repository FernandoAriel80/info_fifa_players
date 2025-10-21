import { Injectable } from '@angular/core';
import { PlayerFilterDto } from '../dto/player-filter-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../shared/models/player-model';
import { PlayerApiResponseDto } from '../dto/player-api-response-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiImplService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlayers(filters: PlayerFilterDto): Observable<PlayerApiResponseDto<Player[]>> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.club) params = params.set('club', filters.club);
    if (filters.position) params = params.set('position', filters.position);
    if (filters.version) params = params.set('version', filters.version);
    if (filters.nationality) params = params.set('nationality', filters.nationality);
    if (filters.league) params = params.set('league', filters.league);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());

    return this.http.get<PlayerApiResponseDto<Player[]>>(`${this.apiUrl}/players/pagination/`, {
      params,
    });
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`/players/${id}`);
  }

  getPlayersByName(name: string): Observable<PlayerApiResponseDto<Player[]>> {
    let params = new HttpParams().set('name', name);

    return this.http.get<PlayerApiResponseDto<Player[]>>(`${this.apiUrl}/players/players-name`, {
      params,
    });
  }
}
