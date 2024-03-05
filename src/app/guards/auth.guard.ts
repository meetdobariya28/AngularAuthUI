
import { Inject, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {//--Ang-Token--3 create a guard to check if log in or not and add it in routeing.module

  const router = inject(Router);
  const toast = inject(NgToastService);
  const auth = inject(AuthService);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    toast.error({ detail: "Error!!", summary: "Plase Login first", duration: 5000 });
    router.navigate(['login']);
    return false;
  }
  
};