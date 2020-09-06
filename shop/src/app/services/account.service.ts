import { Injectable } from '@angular/core';
import { User } from '../login/user';
import { AlertifyService } from './alertify.service';

@Injectable()
export class AccountService {

  constructor(private alertifyService: AlertifyService) { }
  loggedIn = false;
  login(user: User): boolean{
    if(user.userName == "root" && user.password == "toor"){
      this.loggedIn = true;
      localStorage.setItem("isLogged",user.userName);
      this.alertifyService.success("Sisteme giriş yapıldı.");
      return true;
    }
    else{
      this.alertifyService.error("Kullanıcı adı veya şifre hatalı!");
      return false;
    }
    
  }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

  logOut(){
    localStorage.removeItem("isLogged");
    this.loggedIn = false;
  }
}
