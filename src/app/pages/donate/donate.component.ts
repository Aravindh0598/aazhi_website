import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

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
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }

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
      alert(this.t('donate.alertRequired'));
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
      alert(this.t('donate.alertTransId'));
      return;
    }
    
    this.apiService.submitDonation(this.donationForm).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert(this.t('donate.alertSuccess'));
          this.step = 1; 
          this.donationForm = { name: '', email: '', phone: '', address: '', amount: null, location: '', transaction_id: '' };
        } else {
          alert('Error: ' + (res.message || this.t('donate.alertError')));
        }
      },
      error: (err: any) => {
        console.error('Donation Error:', err);
        alert(this.t('donate.alertError'));
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert(this.t('donate.copied'));
    }).catch((err: any) => {
      console.error('Could not copy text: ', err);
    });
  }
}
