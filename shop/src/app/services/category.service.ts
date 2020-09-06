import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { Category } from '../categori/category';
import { tap,catchError } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  path: string = "http://localhost:3000/categories";
  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.path).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = "Bir hata oluştu hata: " + err.error.message;
    }
    else{
      errorMessage = "Sistemsel bir hata";
    }
    return throwError(errorMessage);
  }
}
