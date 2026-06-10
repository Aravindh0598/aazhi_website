import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  email = '';
  currentYear = new Date().getFullYear();
  homeSettings: any = null;
  contacts: any[] = [];

  public apiService = inject(ApiService);
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }

  ngOnInit(): void {
    this.apiService.homeSettings$.subscribe(settings => {
      // console.log('Footer: Home Settings received:', settings);
      this.homeSettings = settings;
    });

    this.apiService.getContacts().subscribe({
      next: (response) => {
        // console.log('Footer: Contacts response:', response);
        if (response.success) {
          this.contacts = response.data;
        }
      },
      error: (err) => console.error('Footer: Failed to load contacts', err)
    });
  }

  onSubscribe(): void {
    if (this.email) {
      this.apiService.subscribe(this.email).subscribe({
        next: (response: any) => {
          if (response.success) {
            alert(response.message);
            this.email = ''; // Reset input
          }
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to subscribe. Please try again.');
        }
      });
    }
  }

  get primaryContact() {
    return this.contacts.length > 0 ? this.contacts[0] : null;
  }

  get todayTimings() {
    if (!this.primaryContact?.timings || !this.primaryContact.timings.length) return null;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const todayIndex = now.getDay();
    const todayName = days[todayIndex];
    
    // Format Date like "10/April/2026"
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleDateString(this.languageService.getCurrentLanguage() === 'ta' ? 'ta-IN' : 'en-US', { month: 'long' });
    const year = now.getFullYear();
    const dateStr = `${day}/${month}/${year}`;
    
    // Get localized day name
    const dayKey = `day.${todayName}`;
    const localizedTodayName = this.t(dayKey);
    const fullDayStr = `${localizedTodayName}, ${dateStr}`;
    
    // Find timing for today
    const timing = this.primaryContact.timings.find((t: any) => t.day === todayName);
    
    if (todayName === 'Sunday') {
      return `${fullDayStr}: ${this.t('time.Holiday')}`;
    }
    
    if (timing && timing.from && timing.to) {
      return `${fullDayStr}: ${this.formatTime(timing.from)} - ${this.formatTime(timing.to)}`;
    }
    
    return `${fullDayStr}: ${this.t('time.Closed')}`;
  }

  private formatTime(time: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
}
