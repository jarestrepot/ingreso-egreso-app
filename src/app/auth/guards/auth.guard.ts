import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject( AuthService );
  const router = inject(Router);
  return authService.isAuthenticated().pipe(
    tap((state:boolean) => {
      if( !state ) router.navigate(['/auth/login']);
    }),
    take(1)
  );
};

