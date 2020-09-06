import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { City } from 'src/app/models/City';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers:[CityService]
})
export class CityAddComponent implements OnInit {

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  city:City;
  cityAddForm: FormGroup;
  htmlContent;
  ngOnInit() {
    this.createCityForm();
  }

  createCityForm(){
    this.cityAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      description: ["",Validators.required]
    });
  }

  add(){
    console.log("selam" + this.city);
    this.city = Object.assign({},this.cityAddForm.value);
    //todo
    this.city.userId = this.authService.getCurrentUserId();
    this.cityService.add(this.city);
  }

}
