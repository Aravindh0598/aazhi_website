import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImpactStoryService } from './impact-stories.service';

export interface ImpactStory {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  media_type: string;
  category: string;
  slug: string;
}

export interface StoryCategory {
  name: string;
  count: number;
}

@Component({
  selector: 'app-impact-stories',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './impact-stories.component.html',
  styleUrl: './impact-stories.component.css'
})
export class ImpactStoriesComponent implements OnInit {

  selectedCategory = '';
  currentPage = 1;
  readonly storiesPerPage = 12;
  allStories: ImpactStory[] = [];
  categories: StoryCategory[] = [];
  loading = true;

  constructor(private storyService: ImpactStoryService) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe({
      next: (stories) => {
        this.allStories = stories;
        this.buildCategories();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load stories', err);
        this.loading = false;
      }
    });
  }

  buildCategories(): void {
    const categoryMap = new Map<string, number>();
    this.allStories.forEach(story => {
      const cat = story.category || 'General';
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });
    this.categories = Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
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