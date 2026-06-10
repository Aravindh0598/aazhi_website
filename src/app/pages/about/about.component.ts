import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  aboutContent: any = null;
  aboutDocuments: any[] = [];
  governingBodies: any[] = [];
  loading = true;

  public apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getAbout().subscribe({
      next: (res) => {
        console.log('About Us Component - Received dynamic API data:', res);
        if (res.success && res.data) {
          this.aboutContent = res.data.content;
          this.aboutDocuments = res.data.documents;
          this.governingBodies = res.data.governingBodies;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load About Us data', err);
        this.loading = false;
      }
    });
  }
}
