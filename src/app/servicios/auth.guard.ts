import { CanActivateFn, Router } from '@angular/router';
import { AutenticadorService } from './autenticador.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticadorService);
  const router = inject(Router);

  if (authService.isConnected()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
