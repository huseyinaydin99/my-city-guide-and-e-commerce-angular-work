import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/categori/category';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-add-forms1',
  templateUrl: './product-add-forms1.component.html',
  styleUrls: ['./product-add-forms1.component.css'],
  providers: [CategoryService,ProductService]
})
export class ProductAddForms1Component implements OnInit {

  constructor(private categoryService: CategoryService, private productService: ProductService,private alertifyService: AlertifyService) { }
  model: Product = new Product();

  categories: Category[];
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  add(form: NgForm){
    //console.log(form.value.name);
    this.productService.addProduct(this.model).subscribe(data=>{
      this.alertifyService.success(data.name + "başarı ile eklendi");
    });
  }

}
