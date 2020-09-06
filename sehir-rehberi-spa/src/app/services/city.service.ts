import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/City';
import { Observable } from 'rxjs';
import { Photo } from '../models/Photo';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient,private router: Router,private alertifyService: AlertifyService) {

  }
  path = "https://localhost:44387/api";
  getValues():Observable<City[]>{
    return this.httpClient.get<City[]>(this.path + "/cities");
  }

  getCityById(cityId):Observable<City>{
    return this.httpClient.get<City>(this.path + "/cities/detail/?id=" + cityId);
  }

  getPhotosByCityId(cityId):Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.path + "/cities/photos/?cityId=" + cityId);
  }

  add(city){
    this.httpClient.post(this.path + "/cities/add",city).subscribe(data=>{
      this.router.navigateByUrl("cityDetail/"+data["id"]);
      this.alertifyService.success("Şehir eklendi!");
    });
    
  }
}
