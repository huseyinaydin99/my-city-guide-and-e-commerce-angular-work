import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { Product } from '../product/product';
import { tap,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  path: string = "http://localhost:3000/products";
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }

  getProducts(categoryId):Observable<Product[]>{
    let newPath = this.path;
    if(categoryId){
      newPath += "?id="+categoryId;
    }

    return this.http.get<Product[]>(newPath).pipe(
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

  addProduct(product: Product):Observable<Product>{
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Token'
      })
    };

    return this.http.post<Product>(this.path,product,httpOptions).pipe(
      tap(data=>console.log(JSON.stringify(data)),
      catchError(this.handleError)
    ));
  }


}
