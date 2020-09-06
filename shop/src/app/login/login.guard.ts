import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';

@Injectable() //bir sınıfın servis olabilimesi için @Injectable gereklidir.
export class LoginGuard implements CanActivate {

    constructor(private accountService: AccountService, private router: Router) {

    }

    /*canActivate(route_gitmek_isdetigi_yer: ActivatedRouteSnapshot, state_bulunduğu_yer: RouterStateSnapshot);*/

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.accountService.isLoggedIn();
        if(logged){
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }

}