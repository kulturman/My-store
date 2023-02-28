import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.sevice';
import { CartItem } from 'src/app/services/models/cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService) {}
  private subscription!: Subscription;
  public cartItems!: CartItem[];
  public fullName: string = '';
  public address: string = '';
  public creditCard: string = '';
  public totalPrice: string = '';
  
  ngOnInit(): void {
    this.subscription = this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.cartItems;
      this.totalPrice = parseFloat(cart.totalPrice.toString()).toFixed(2);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  completeOrder() {
    this.cartService.completeOrder({
      address: this.address,
      creditCard: this.creditCard,
      fullName: this.fullName,
      totalCost: this.cartService.computePrice()
    });
  }

  updateCartItem(cartItem: CartItem) {
    this.cartService.updateItem(cartItem);
    this.totalPrice = parseFloat(this.cartService.computePrice().toString()).toFixed(2);
  }

  deleteCartItem(cartItem: CartItem) {
    let index = this.cartItems.findIndex(item => item.id === cartItem.id);
    this.cartItems.splice(index, 1);
    this.cartService.deleteItem(cartItem);
  }
}
