import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.sevice';
import { Product } from 'src/app/services/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private productId!: number;
  private routeSubscription!: Subscription;
  public product!: Product;
  public quantity: string = '0';
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.productId = +params['product'];
    })
    
    this.productService.getProduct(this.productId).subscribe(product => {
      if (product) {
        this.product = product
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  addToCart($event: Event) {
    if (+this.quantity <= 0) {
      alert('Please enter a valid quantity');
    }
    else {
      this.cartService.addToCart(this.productId, +this.quantity);
    }
  }

}
