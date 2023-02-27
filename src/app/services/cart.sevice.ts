import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private CART_KEY = 'cart';
    private cartItems: Array<{productId: number, quantity: number}> = [];

    addToCart(productId: number, quantity: number) {
        let cart = localStorage.getItem(this.CART_KEY);
        if (cart == null) {
            this.cartItems.push({
                productId,
                quantity
            });
            localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
        }
        else {
            this.cartItems = JSON.parse(cart);
            let productIndex = this.cartItems.findIndex(product => product.productId == productId);
            if (productIndex < 0) {
                this.cartItems.push({
                    productId,
                    quantity
                });
            }
            else {
                this.cartItems[productIndex].quantity += quantity;
            }
            localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
        }
        alert('Product added with success');
    }

}