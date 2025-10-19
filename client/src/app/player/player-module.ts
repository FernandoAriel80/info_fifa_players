import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerListComponent } from './pages/player-list-component/player-list-component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PlayerListComponent
      }
    ])
  ]
})
export class PlayerModule { }
