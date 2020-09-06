import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { LoginUser } from '../models/LoginUser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }
  loginUser: LoginUser = new LoginUser();
  loginForm: FormGroup;
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password: ["",Validators.required]
    });
  }

  login(){
    //alert("mer " + this.loginUser.userName + " " + this.loginUser.password);
    if(this.authService.login(this.loginUser)){
      //this.router.navigateByUrl("/cityadd");
      //this.router.navigateByUrl("/city");
    }
  }

  get isAuthenticated(){
    return this.authService.loggedIn();
  }

  logOut(){
    this.authService.logOut();
    this.loginUser.password = "";
    this.loginUser.userName = "";
    this.router.navigateByUrl("/cityadd");
    this.router.navigateByUrl("/city");
  }

  get currentUser():string{
    console.log(localStorage.getItem("token"));
    return this.authService.getCurrentUser();
  }

}
