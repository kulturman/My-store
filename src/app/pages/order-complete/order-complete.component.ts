import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent {
  public fullName!: string;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    
    if (!state) {
      this.router.navigate(['']);
    }
    
    if (state && state['fullName']) {
      this.fullName = state['fullName'];
    }
  }
}
