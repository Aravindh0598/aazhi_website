import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    submitted = false;

  // Branch dropdown change
  onBranchChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log('Selected branch:', value);
  }

  // Submit button
  onSubmit() {
    this.submitted = true;

    // hide message after 4 seconds (optional)
    setTimeout(() => {
      this.submitted = false;
    }, 4000);
  }

}
