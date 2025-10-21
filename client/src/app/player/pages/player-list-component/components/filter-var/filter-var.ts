import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PlayerFilterDto } from '../../../../dto/player-filter-dto';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Nationality } from '../../../../../shared/models/nationality-model';
import { NationalityApiImplService } from '../../../../../nationality/service/nationality-api-impl-service';
import { PositionApiImplService } from '../../../../../position/service/position-api-impl-service';
import { ClubApiImplService } from '../../../../../club/service/club-api-impl-service';
import { LeagueApiImplService } from '../../../../../league/service/league-api-impl-service';
import { Position } from '../../../../../shared/models/position-model';
import { Club } from '../../../../../shared/models/club-model';
import { League } from '../../../../../shared/models/league-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-var',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-var.html',
  styleUrl: './filter-var.css',
})
export class FilterVar implements OnInit {
  nationalites: Nationality[] = [];
  positions: Position[] = [];
  clubs: Club[] = [];
  leagues: League[] = [];
  typeButton: string = '';

  @Input() initialFilters!: PlayerFilterDto;
  @Output() filtersChanged = new EventEmitter<PlayerFilterDto>();

  filterForm: FormGroup;

  constructor(
    private readonly nationalityApiImplService: NationalityApiImplService,
    private readonly positionApiImpleService: PositionApiImplService,
    private readonly clubApiImplService: ClubApiImplService,
    private readonly leagueApiImplService: LeagueApiImplService
  ) {
    this.filterForm = new FormGroup({
      name: new FormControl(),
      nationality: new FormControl(),
      position: new FormControl(),
      club: new FormControl(),
      sortBy: new FormControl(),
      league: new FormControl(),
      version: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loadNationalities();
    this.loadPositions();
    this.loadLeagues();
    this.loadClubs();
  }

  private loadNationalities() {
    this.nationalityApiImplService.getNationalities().subscribe({
      next: (response) => {
        this.nationalites = response.data;
      },
    });
  }

  private loadPositions() {
    this.positionApiImpleService.getPositions().subscribe({
      next: (response) => {
        this.positions = response.data;
      },
    });
  }

  private loadLeagues() {
    this.leagueApiImplService.getLeagues().subscribe({
      next: (response) => {
        this.leagues = response.data;
      },
    });
  }

  private loadClubs() {
    this.clubApiImplService.getClubs().subscribe({
      next: (response) => {
        this.clubs = response.data;
      },
    });
  }
  applyFilters() {

    const filters = this.filterForm.value;
    this.filtersChanged.emit(filters);
  }

}
