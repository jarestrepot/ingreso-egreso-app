import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject(Router);
  return authService.isAuthenticated().pipe(
    tap((state:boolean) => {
      if( !state ) router.navigate(['/auth/login']);
    }),
  );
};
