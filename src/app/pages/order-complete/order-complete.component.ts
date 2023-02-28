import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent {
  public fullName!: string;
  public totalCost!: string;
  public address!: string;
  public creditCard!: string;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;console.log(state)
    
    if (!state) {
      this.router.navigate(['']);
    }
    
    if (state) {
      this.fullName = state['fullName'];
      this.totalCost = parseFloat(state['totalCost'].toString()).toFixed(2);
      this.address = state['address'];
      this.creditCard = state['creditCard'];
    }
  }
}
