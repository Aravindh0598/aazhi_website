import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email = '';
  currentYear = new Date().getFullYear();

  onSubscribe(): void {
    if (this.email) {
      alert(`Thank you for subscribing with ${this.email}!`);
      this.email = '';
    }
  }
}
