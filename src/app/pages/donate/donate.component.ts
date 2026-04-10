import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent implements OnInit {
  step = 1;
  homeSettings: any = null;
  
  public apiService = inject(ApiService);

  donationForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    amount: null,
    location: '',
    transaction_id: ''
  };

  ngOnInit(): void {
    this.apiService.homeSettings$.subscribe(settings => {
      this.homeSettings = settings;
    });
  }

  nextStep(): void {
    if (!this.donationForm.name || !this.donationForm.email || !this.donationForm.amount) {
      alert('Please fill in the required fields: Name, Email, and Amount.');
      return;
    }
    this.step = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevStep(): void {
    this.step = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitDonation(): void {
    if (!this.donationForm.transaction_id) {
      alert('Please enter the Transaction ID / Ref Number.');
      return;
    }
    
    this.apiService.submitDonation(this.donationForm).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Thank you! Your donation details have been submitted for verification.');
          this.step = 1; 
          this.donationForm = { name: '', email: '', phone: '', address: '', amount: null, location: '', transaction_id: '' };
        } else {
          alert('Error: ' + (res.message || 'Could not submit donation.'));
        }
      },
      error: (err: any) => {
        console.error('Donation Error:', err);
        alert('An error occurred while submitting your details. Please try again later.');
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('UPI ID copied to clipboard!');
    }).catch((err: any) => {
      console.error('Could not copy text: ', err);
    });
  }
}
