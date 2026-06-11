import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
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
export class GalleryDetailComponent implements OnInit, OnDestroy {
  gallery: any = null;
  loading = true;
  selectedImageUrl: string | null = null;
  currentImageIndex = 0;

  private route = inject(ActivatedRoute);
  public apiService = inject(ApiService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchGalleryDetail(id);
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
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

  openModal(imageUrl: string, index: number): void {
    this.currentImageIndex = index;
    this.selectedImageUrl = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedImageUrl = null;
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    if (!this.gallery?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.gallery.images.length;
    this.selectedImageUrl = this.getImageUrl(this.gallery.images[this.currentImageIndex].image);
  }

  prevImage(): void {
    if (!this.gallery?.images?.length) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.gallery.images.length) % this.gallery.images.length;
    this.selectedImageUrl = this.getImageUrl(this.gallery.images[this.currentImageIndex].image);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (!this.selectedImageUrl) return;
    if (e.key === 'Escape')      this.closeModal();
    if (e.key === 'ArrowRight')  this.nextImage();
    if (e.key === 'ArrowLeft')   this.prevImage();
  }
}
