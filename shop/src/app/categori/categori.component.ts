import { Component, OnInit } from '@angular/core';
import {Category} from './category';
import {CategoryService} from '../services/category.service'

@Component({
  selector: 'app-categori',
  templateUrl: './categori.component.html',
  styleUrls: ['./categori.component.css'],
  providers:[CategoryService] //eğer biz buraya provider'e categoriy service yi eklersek o zaman bu servis local servis oluyor. yani global olmuyor ve sadece buradan erişiliyor.
})
export class CategoriComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  title= "Kategori Listesi";
  categories: Category[];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    });
  }

}
