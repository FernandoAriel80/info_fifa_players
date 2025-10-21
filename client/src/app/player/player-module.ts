import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerListComponent } from './pages/player-list-component/player-list-component';
import { PlayerDetail } from './pages/player-detail/player-detail';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PlayerListComponent
      },{
        path:'player/:name/:id', component: PlayerDetail
      }
    ])
  ]
})
export class PlayerModule { }
