import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  galleries: any[] = [];
  loading = true;

  public apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getGalleries().subscribe({
      next: (res) => {
        if (res.success) {
          this.galleries = res.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load galleries', err);
        this.loading = false;
      }
    });
  }

  getThumbnail(gallery: any): string {
    if (gallery.images && gallery.images.length > 0) {
      return this.apiService.storageUrl + gallery.images[0].image;
    }
    return 'assets/images/placeholder.jpg';
  }
}
