import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerApiImplService } from '../../service/player-api-impl-service';
import { Player } from '../../../shared/models/player-model';
import { NgOptimizedImage } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-player-detail',
  imports: [NgOptimizedImage, BaseChartDirective],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css',
})
export class PlayerDetail {
  playerName: string = '';
  playerId?: number;
  players?: Player[];
  currentVersion?: number | null;
  currentPlayer: Player = {} as Player;

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          color: '#ffd700',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public radarChartLabels: string[] = [
    'Definición',
    'Regate',
    'Velocidad',
    'Fuerza',
    'Pase',
    'Defensa',
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        label: 'Estadísticas',
        data: [0, 0, 0, 0, 0, 0], // Valores iniciales
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 0.8)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  public radarChartType: 'radar' = 'radar';

  constructor(private route: ActivatedRoute, private playerApiImplService: PlayerApiImplService) {}

  selectedVersion(player: Player) {
    this.currentVersion = player.fifa_version;
    this.currentPlayer = player;
    this.updateRadarChart();
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.playerName = param['name'];
      this.playerId = Number(param['id']);
    });

    this.loadPlayers(this.playerName);
    this.updateRadarChart();
  }

  private updateRadarChart() {
    if (this.currentPlayer?.stats) {
      this.radarChartData.datasets[0].data = [
        this.currentPlayer.stats.attacking_finishing, // Definición
        this.currentPlayer.stats.dribbling, // Regate
        this.currentPlayer.stats.movement_sprint_speed, // Velocidad
        this.currentPlayer.stats.power_strength, // Fuerza
        this.currentPlayer.stats.passing, // Pase
        this.currentPlayer.stats.defending, // Defensa
      ];

      this.radarChartData = { ...this.radarChartData };
    }
  }

  private loadPlayers(name: string) {
    this.playerApiImplService.getPlayersByName(name).subscribe({
      next: (response) => {
        this.players = response.data;
        console.log(response.data);
        this.currentVersion =
          response.data?.find((player) => player.id === this.playerId)?.fifa_version || null;

        this.currentPlayer =
          response.data?.find((player) => player.fifa_version === this.currentVersion) ||
          ({} as Player);

        this.updateRadarChart();
      },
      error: (error) => {
        console.error('Error loading player:', error);
      },
    });
  }
}
