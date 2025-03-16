import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const toastr = inject(ToastrManager);

  if (localStorage.getItem("isloggedInEMS")) {
    return true;
  }

  // Show Toastr message and redirect
  toastr.errorToastr("Access denied! Please log in first.", "Unauthorized");
  router.navigateByUrl('/login');

  return false;
};
