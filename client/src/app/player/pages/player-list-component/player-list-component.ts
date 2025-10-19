import { Component, OnInit } from '@angular/core';
import { Player } from '../../../shared/models/player-model';
import { PlayerApiImplService } from '../../service/player-api-impl-service';
import { PlayerFilterDto } from '../../dto/player-filter-dto';
import { FilterVar } from './components/filter-var/filter-var';
import { PlayerCards } from './components/player-cards/player-cards';
import { CsvApiImplService } from '../../service/csv-api-impl-service';

@Component({
  selector: 'app-player-list',
  imports: [FilterVar, PlayerCards],
  templateUrl: './player-list-component.html',
  styleUrl: './player-list-component.css',
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  selectedFile: File | null = null;

  loading: boolean = true;
  error: string | null = null;

  currentFilters: PlayerFilterDto = {
    page: 1,
    limit: 10,
  };

  meta = {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    totalPages: 0,
  };

  constructor(
    private playerApiImplService: PlayerApiImplService,
    private csvApiImplService: CsvApiImplService

  ) {}

  ngOnInit(): void {
    this.loadPlayers({ page: 1, limit: 30 });
  }

  private loadPlayers(filters: PlayerFilterDto = {}) {
    this.loading = true;
    this.error = '';

    this.playerApiImplService.getPlayers(filters).subscribe({
      next: (response) => {
        this.players = response.data;
        this.loading = false;
        this.meta = response.meta;
        console.log(response);
      },
    });
  }

  onFiltersChanged(filters: PlayerFilterDto) {
    this.currentFilters = { ...this.currentFilters, ...filters, page: 1 };
    this.loadPlayers(this.currentFilters);
  }

  // 👇 Cambia de página y vuelve a pedir los datos
  changePage(page: number) {
    if (page < 1 || page > this.meta.totalPages) return;
    this.currentFilters = { ...this.currentFilters, page };
    this.loadPlayers(this.currentFilters);
  }

  onDownloadCSV() {
    this.csvApiImplService.downloadCSV(this.currentFilters).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'players_filtered.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error descargando CSV:', err);
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  uploadCSV() {
    this.csvApiImplService.createUploadCSV(this.selectedFile)
  }
}
