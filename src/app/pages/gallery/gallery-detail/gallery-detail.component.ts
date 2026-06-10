import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery-detail.component.html',
  styleUrl: './gallery-detail.component.css'
})
export class GalleryDetailComponent implements OnInit {
  gallery: any = null;
  loading = true;
  selectedImageUrl: string | null = null;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchGalleryDetail(id);
    }
  }

  fetchGalleryDetail(id: string): void {
    this.apiService.getGalleries().subscribe({
      next: (res) => {
        if (res.success) {
          this.gallery = res.data.find((g: any) => g.id.toString() === id);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load gallery detail', err);
        this.loading = false;
      }
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : this.apiService.storageUrl + imagePath;
  }

  openModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  closeModal(): void {
    this.selectedImageUrl = null;
    document.body.style.overflow = 'auto'; // Unlock scroll
  }
}
