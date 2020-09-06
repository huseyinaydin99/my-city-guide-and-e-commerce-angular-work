import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AlertifyService } from "../services/alertify.service";
import { ProductService } from "../services/product.service";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [AlertifyService,ProductService] //eğer biz buraya providers(sağlayıcı) eklersek bu servis local(sadece buradan erişilebilir) servis oluyor.
})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService,private productService: ProductService, private activatedRoute: ActivatedRoute) { }
  title = "Ürün Listesi"
  filterText = "";
  products: Product[];
  
  ngOnInit(): void { //komponent ilk defa yüklendiğinde çalışır
    this.activatedRoute.params.subscribe(params=>{
      this.productService.getProducts(params["categoryId"]).subscribe(data=>{
        this.products = data;
      });
    })
    
  }

  addToCard(product) {
    //alert("sepete eklendi " + product.name);
    this.alertifyService.success("Sepete eklendi " + product.name);
  }

}
