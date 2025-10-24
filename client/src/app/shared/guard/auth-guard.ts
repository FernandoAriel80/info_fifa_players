// shared/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // ✅ Permite el acceso
    } else {
      // ❌ Redirige al login si no está autenticado
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}