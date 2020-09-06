import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Value } from '../models/Value';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  values: Value[] = [];
  ngOnInit() {
    this.getValues().subscribe(data=>{
      this.values = data;
    })
  }

  getValues():Observable<Value[]>{
    return this.httpClient.get<Value[]>("https://localhost:44313/weatherforecast");
  }

}
