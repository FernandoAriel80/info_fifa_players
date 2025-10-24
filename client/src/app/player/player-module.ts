import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerListComponent } from './pages/player-list-component/player-list-component';
import { PlayerDetail } from './pages/player-detail/player-detail';
import { AuthGuard } from '../shared/guard/auth-guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PlayerListComponent, canActivate: [AuthGuard]
      },{
        path:'player/:name/:id', component: PlayerDetail, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class PlayerModule { }
