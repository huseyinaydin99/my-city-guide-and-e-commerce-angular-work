import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService) { }
  path = "https://localhost:44387/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  loginState: boolean = false;
  userName: string = "";
  registerState:boolean = false;
  login(loginUser: LoginUser):boolean {
    alert("login");
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    /*let params = new HttpParams()
    params = params.set('userName', loginUser.userName);
    params = params.set('password', loginUser.password);*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //alert("selam");
    alert(loginUser.userName + " " + loginUser.password);
    this.httpClient.post(this.path + "login", loginUser, { headers: headers, responseType: 'text' }).subscribe(data => {
      console.log("Hi");
      this.saveToken(data);
      /*console.log("Hi");
      console.log(data);*/
      //alert("Hi");
      this.userToken = data;
      this.decodedToken = this.jwtHelper.decodeToken(data.toString());
      this.alertifyService.success("Sisteme giriş yapıldı!");
      this.loginState = true;
      this.userName = loginUser.userName;
      
    });
    //alert("ttt");
    return this.loginState;
  }

  saveToken(token) {
    /*alert("abc");
    alert(token);*/
    localStorage.setItem(this.TOKEN_KEY, token);
    //localStorage.setItem("user",this.userName);
  }

  register(registerUser: RegisterUser) {
    let header = new HttpHeaders();
    header = header.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "register", registerUser, { headers: header }).subscribe(data => {
      this.registerState = true;
    });
    this.alertifyService.success("Kayıt işlemi başarılı!");
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loginState = false;
    
    this.userName = "";
    this.alertifyService.error("Sistemden çıkış yapıldı!");
  }

  loggedIn() {
    //return this.tokenNotExpired(this.TOKEN_KEY,this.decodedToken);
    return this.loginState;
  }

  tokenNotExpired(tokenName, jwt) {
    var token = jwt || localStorage.getItem(tokenName);// here is force to get from localStorage but not tokenGetter options of AuthConfig
    var jwtHelper = new JwtHelperService();
    return token != null && !jwtHelper.isTokenExpired(token);
  }

  get token() {

    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): string {
    return this.userName;
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
}
