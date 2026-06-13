import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  category: string;
  category_slug: string;
  slug: string;
  image: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  searchQuery = '';
  activeCategory = 'all';
  currentPage = 1;
  readonly postsPerPage = 10;

  allPosts: BlogPost[] = [];
  categories: Category[] = [];

  filteredPosts: BlogPost[] = [];
  pagedPosts:    BlogPost[] = [];
  totalPages = 1;
  pageNumbers: number[] = [];

  public apiService = inject(ApiService);
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }

  ngOnInit(): void {
    this.apiService.getBlogs().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allPosts = response.data.map((item: any) => {
            // Strip HTML tags for the blog card excerpt
            let plainText = '';
            if (typeof document !== 'undefined') {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = item.description || '';
              plainText = tempDiv.textContent || tempDiv.innerText || '';
            } else {
              plainText = (item.description || '').replace(/<[^>]*>/g, '');
            }

            return {
              id: item.id,
              title: item.title,
              date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              excerpt: plainText,
              description: item.description || '',
              category: item.tag_category?.name || 'Uncategorized',
              category_slug: item.tag_category?.id ? item.tag_category.id.toString() : 'uncategorized',
              slug: item.id.toString(),
              image: item.image ? (item.image.startsWith('http') ? item.image : this.apiService.storageUrl + item.image) : ''
            };
          });

          // Generate categories from loaded data
          const catMap = new Map<string, { name: string, count: number }>();
          this.allPosts.forEach(p => {
            const catSlug = p.category_slug;
            const existing = catMap.get(catSlug);
            if (existing) {
              existing.count++;
            } else {
              catMap.set(catSlug, { name: p.category, count: 1 });
            }
          });
          this.categories = Array.from(catMap.entries()).map(([slug, value]) => ({
            name: value.name,
            slug: slug,
            count: value.count
          }));
        }
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load blogs:', err);
        this.applyFilters();
      }
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;

    this.currentPage = 1;
    this.applyFilters();
  }

  filterByCategory(slug: string): void {
    this.activeCategory = this.activeCategory === slug ? 'all' : slug;
    this.currentPage = 1;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private applyFilters(): void {
    const q = this.searchQuery.trim().toLowerCase();

    this.filteredPosts = this.allPosts.filter(p => {
      const matchCat = this.activeCategory === 'all' || p.category_slug === this.activeCategory;
      const matchQ   = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    this.totalPages = Math.max(1, Math.ceil(this.filteredPosts.length / this.postsPerPage));
    this.updatePage();
  }

  private updatePage(): void {
    const start = (this.currentPage - 1) * this.postsPerPage;
    this.pagedPosts = this.filteredPosts.slice(start, start + this.postsPerPage);
    this.buildPageNumbers();
  }

  private buildPageNumbers(): void {
    const pages: number[] = [];
    const total = this.totalPages;
    const cur   = this.currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (cur > 3)          pages.push(-1);
      for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
      if (cur < total - 2)  pages.push(-1);
      pages.push(total);
    }

    this.pageNumbers = pages;
  }

  // number of filtered posts
  getFilteredCount(): number {
    return this.filteredPosts.length;
  }

  // posts for current page
  getPaginatedPosts(): BlogPost[] {
    return this.pagedPosts;
  }

  // total pages
  getTotalPages(): number {
    return this.totalPages;
  }

  // page numbers for pagination
  getPageNumbers(): number[] {
    return this.pageNumbers;
  }

  // clear search
  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  // selected category (alias used in template)
  selectedCategory = 'all';

  // category selection
  selectCategory(slug: string): void {
    this.selectedCategory = this.selectedCategory === slug ? 'all' : slug;
    this.activeCategory = this.selectedCategory;
    this.currentPage = 1;
    this.applyFilters();
  }

  expandedPostId: number | null = null;

  togglePost(id: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.expandedPostId = this.expandedPostId === id ? null : id;
  }

  isExpanded(id: number): boolean {
    return this.expandedPostId === id;
  }

  // recent posts
  getRecentPosts(): BlogPost[] {
    return this.allPosts.slice(0, 5);
  }

}