import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template:`<p>
              product works!
              {{name}}
            </p>`,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }
  name = "laptop";
  ngOnInit(): void {
  }

}
