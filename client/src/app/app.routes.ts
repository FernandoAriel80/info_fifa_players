import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/presentation/layouts/main-layout-component/main-layout-component';
import { HomeComponent } from './shared/presentation/home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '', // Ruta de inicio pública
        component: HomeComponent,
      },
      {
        path: 'players',
        loadChildren: () => import('./player/player-module').then((m) => m.PlayerModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
      },
      {
        path: '**',
        redirectTo: '/auth/login', 
      },
    ],
  },
];
