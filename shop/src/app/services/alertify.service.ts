import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message: string){
    alertify.success(message);
    /*alertify
      .alert("This is an alert dialog.", function () {
        alertify.message('OK');
      });*/
  }

  error(message: string){
    alertify.error(message);
    /*alertify
      .alert("This is an alert dialog.", function () {
        alertify.message('OK');
      });*/
  }

  warning(message: string){
    alertify.warning(message);
    /*alertify
      .alert("This is an alert dialog.", function () {
        alertify.message('OK');
      });*/
  }
}
