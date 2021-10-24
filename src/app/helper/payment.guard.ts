import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwtDecode from "jwt-decode";
import { User } from '../models';

import { CartService, AuthenticationService } from './../services';

@Injectable({ providedIn: 'root' })
export class PaymentGuard implements CanActivate {
  private currentUser: User
  constructor(
    private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const numberItem = (await this.cartService.fetchCartCount(this.currentUser)).count;
      if (numberItem && numberItem > 0) {
        return true
      } else {
        this.router.navigate(['/your-carts'])
        return false
      }
    } catch (error) {
      this.router.navigate(['/your-carts']);
      return false;
    }
  }
}