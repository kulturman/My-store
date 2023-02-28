import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { CartItem } from "./models/cartItem.model";
import { Product } from "./models/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private CART_KEY = 'cart';
    private fileUrl: string = './assets/data.json';

    constructor(private http: HttpClient, private router: Router) {}

    getCart() {
        const cartItemsMap = this.getCartItemsAsMap();
        return this.http.get<Product[]>(this.fileUrl).pipe(
            map(products => {
                const cartItems: CartItem[] = [];
                let totalPrice = 0;

                products.forEach(product => {
                    if (cartItemsMap[product.id]) {
                        totalPrice += +cartItemsMap[product.id] * product.price;
                        cartItems.push({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: +cartItemsMap[product.id],
                            url: product.url
                        })
                    }
                })
                return { totalPrice, cartItems };
            })
        );
    }

    completeOrder(orderData: { fullName: string, address: string, creditCard: string }) {
        localStorage.removeItem(this.CART_KEY);
        this.router.navigate(['/order/complete'], { state: orderData });
    }

    private getCartItemsAsMap() {
        const cartItems = localStorage.getItem(this.CART_KEY) ?
            JSON.parse(localStorage.getItem(this.CART_KEY) as string) as Array<{productId: string, quantity: number}>:
            [];
        const map: Record<string, string> = {};

        cartItems.forEach((cartItem) => {
            map[cartItem.productId.toString()] = cartItem.quantity.toString(); 
        });

        return map;
    }

    addToCart(productId: number, quantity: number) {
        let cartItems: Array<{productId: number, quantity: number}> = [];
        let cart = localStorage.getItem(this.CART_KEY);
        if (cart == null) {
            cartItems.push({
                productId,
                quantity
            });
            localStorage.setItem(this.CART_KEY, JSON.stringify(cartItems));
        }
        else {
            cartItems = JSON.parse(cart);
            let productIndex = cartItems.findIndex(product => product.productId == productId);
            if (productIndex < 0) {
                cartItems.push({
                    productId,
                    quantity
                });
            }
            else {
                cartItems[productIndex].quantity += quantity;
            }
            localStorage.setItem(this.CART_KEY, JSON.stringify(cartItems));
        }
        alert('Product added with success');
    }

}