import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.sevice';
import { CartItem } from 'src/app/services/models/cartItem.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() updateItem: EventEmitter<CartItem> = new EventEmitter();
  @Output() deleteItem: EventEmitter<CartItem> = new EventEmitter();

  updateCartItem() {
    this.updateItem.emit(this.cartItem);
  }

  deleteCartItem($event: Event) {
    this.deleteItem.emit(this.cartItem);
  }
}
