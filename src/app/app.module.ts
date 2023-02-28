import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ProductDescriptionComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderCompleteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
