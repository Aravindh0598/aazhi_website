import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'aazhi_public';
  showBackToTop = false;

  public homeSettings: any = null;
  public welcomeImages: any[] = [];
  private apiService = inject(ApiService);

  ngOnInit() {
    // Fetch home settings
    this.apiService.getHomeSettings().subscribe({
      next: (response) => {
        if (response.success) {
          this.homeSettings = response.data;
          console.log('Home Settings loaded:', this.homeSettings);
        }
      },
      error: (err) => console.error('Failed to load home settings', err)
    });

    // Fetch welcome images
    this.apiService.getWelcomeImages().subscribe({
      next: (response) => {
        if (response.success) {
          this.welcomeImages = response.data;
          console.log('Welcome Images loaded:', this.welcomeImages);
        }
      },
      error: (err) => console.error('Failed to load welcome images', err)
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
