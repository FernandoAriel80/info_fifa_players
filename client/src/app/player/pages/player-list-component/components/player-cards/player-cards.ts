import { Component, Input } from '@angular/core';
import { Player } from '../../../../../shared/models/player-model';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-player-cards',
  imports: [NgOptimizedImage],
  templateUrl: './player-cards.html',
  styleUrl: './player-cards.css'
})
export class PlayerCards {
@Input() players: Player[] = []
@Input() error: string | null = null
}
