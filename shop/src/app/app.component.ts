import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { AlertifyService } from './services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private accountService: AccountService,
    private alertifyService: AlertifyService,
    private route: Router
  ) {

  }
  title = 'shop';

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  logOut() {
    this.accountService.logOut();
    this.alertifyService.success("Sistemden çıkış yapıldı.");
    this.route.navigate(["login"]);
  }
}
