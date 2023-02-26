import { Component, Input } from '@angular/core';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent {
  @Input() product!: Product;
}
