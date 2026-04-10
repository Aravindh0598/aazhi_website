import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

export interface ImpactStory {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  date: string;
}

export interface StoryCategory {
  name: string;
  count: number;
}

@Component({
  selector: 'app-impact-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-stories.component.html',
  styleUrl: './impact-stories.component.css'
})
export class ImpactStoriesComponent implements OnInit {

  selectedCategory = '';
  currentPage = 1;
  readonly storiesPerPage = 12;

  categories: StoryCategory[] = [];
  allStories: ImpactStory[] = [];

  private apiService = inject(ApiService);
  readonly backendStorageUrl = 'http://localhost:8000/storage/';

  ngOnInit(): void {
    this.apiService.getImpactStories().subscribe({
      next: (response) => {
        if (response.success) {
          this.allStories = response.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            excerpt: item.description,
            image: item.image.startsWith('http') ? item.image : this.backendStorageUrl + item.image,
            category: item.tag_category?.name || 'General',
            slug: item.id.toString(), // Using ID since slug might not be in DB
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          }));

          // Generate categories from data
          const catMap = new Map<string, number>();
          this.allStories.forEach(s => {
            catMap.set(s.category, (catMap.get(s.category) || 0) + 1);
          });
          this.categories = Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
        }
      }
    });
  }

  // ── Filtering ────────────────────────────────────────────

  getFilteredStories(): ImpactStory[] {
    if (!this.selectedCategory) return [...this.allStories];
    return this.allStories.filter(s => s.category === this.selectedCategory);
  }

  // ── Paginated stories for current view ──────────────────

  getPaginatedStories(): ImpactStory[] {
    const filtered = this.getFilteredStories();
    const start = (this.currentPage - 1) * this.storiesPerPage;
    return filtered.slice(start, start + this.storiesPerPage);
  }

  getFeaturedStory(): ImpactStory | null {
    const paginated = this.getPaginatedStories();
    return paginated.length > 0 && this.currentPage === 1 ? paginated[0] : null;
  }

  getGridStories(): ImpactStory[] {
    const paginated = this.getPaginatedStories();
    return this.currentPage === 1 ? paginated.slice(1) : paginated;
  }

  // ── Pagination ───────────────────────────────────────────

  getTotalPages(): number {
    return Math.max(1, Math.ceil(this.getFilteredStories().length / this.storiesPerPage));
  }

  getPageNumbers(): number[] {
    const total = this.getTotalPages();
    const cur = this.currentPage;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: number[] = [1];
    if (cur > 3) pages.push(-1);
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
    if (cur < total - 2) pages.push(-1);
    pages.push(total);
    return pages;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Category ─────────────────────────────────────────────

  selectCategory(name: string): void {
    this.selectedCategory = name;
    this.currentPage = 1;
  }

  clearFilter(): void {
    this.selectedCategory = '';
    this.currentPage = 1;
  }
}