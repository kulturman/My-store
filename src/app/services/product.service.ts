import { Product } from "./models/product.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private fileUrl: string = './assets/data.json';
    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<Product[]>(this.fileUrl); 
    }

    getProduct(id: number) {
        return this.http.get<Product[]>(this.fileUrl).pipe(
            map(products => products.find(item => item.id === +id))
        );
    }
}