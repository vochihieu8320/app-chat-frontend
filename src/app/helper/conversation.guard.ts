import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { AuthenticationService } from './../services';

@Injectable({ providedIn: 'root' })
export class ConversationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const result = await this.authenticationService.checkLoggin();
    // if (result) {
    //   const currentUser = this.authenticationService.currentUserValue;
    //   if(currentUser.type !== "AnyBackup App") {
    //     this.authenticationService.removeCurentUser();
    //     this.router.navigate(['/auth/login']);
    //     return false;
    //   }
    //   return true;
    // } else {
    //   this.authenticationService.removeCurentUser();
    //   this.router.navigate(['/auth/aqc']);
    //   return false;
    // }
    return true;
  }
}