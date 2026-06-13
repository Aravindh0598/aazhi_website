import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private apiService = inject(ApiService);
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }
  
  submitted = false;
  loading = false;
  
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Branch dropdown change
  onBranchChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log('Selected branch:', value);
  }

  // Submit button
  onSubmit() {
    if (!this.formData.firstName || !this.formData.email || !this.formData.message) {
      alert('Please fill in required fields (Name, Email, Message)');
      return;
    }

    this.loading = true;
    const submissionData = {
      name: `${this.formData.firstName} ${this.formData.lastName}`.trim(),
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
      // Phone is not in the migration yet, let's just send what we have
    };

    this.apiService.submitContactForm(submissionData).subscribe({
      next: (response) => {
        if (response.success) {
          this.submitted = true;
          this.loading = false;
          this.resetForm();
          
          // hide message after 5 seconds
          setTimeout(() => {
            this.submitted = false;
          }, 5000);
        }
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Failed to send message. Please try again.');
      }
    });
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
