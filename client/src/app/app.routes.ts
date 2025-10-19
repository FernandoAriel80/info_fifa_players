import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/presentation/layouts/main-layout-component/main-layout-component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            {
                path: 'players',
                loadChildren: () => import('./player/player-module').then(m => m.PlayerModule)
            }
        ]
    }
];
