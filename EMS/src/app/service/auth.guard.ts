import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem("isloggedInEMS")) {
    return true;
  }
  // Redirect if not logged in
  router.navigateByUrl('/login');
  return false;
};
