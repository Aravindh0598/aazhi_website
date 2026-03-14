import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  slug: string;
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

  readonly allPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Care Begins with the Community',
      date: 'January 14, 2026',
      excerpt: 'Reflections from a Field Visit on Community Palliative Care. My last field visit of the year was a lesson in the power of community-led care and the quiet dignity it restores to every elder it touches.',
      category: 'cause-of-serving',
      slug: 'care-begins-with-the-community'
    },
    {
      id: 2,
      title: 'After the Floodwaters Receded, the Stories Remained',
      date: 'January 5, 2026',
      excerpt: 'From 3 to 6 November, 2025, I travelled to Punjab\'s Gurdaspur and Patiala districts with the HelpAge India team, just weeks after devastating floods had swept through the region.',
      category: 'cause-of-serving',
      slug: 'after-the-floodwaters-receded'
    },
    {
      id: 3,
      title: 'In the Warmth of a Second Home',
      date: 'November 24, 2025',
      excerpt: 'In the sprawling campus at Gurdaspur (Punjab) with a driveway of lush green trees, a community of elderly live with purpose, dignity, and the warmth of belonging.',
      category: 'cause-of-serving',
      slug: 'in-the-warmth-of-a-second-home'
    },
    {
      id: 4,
      title: 'The Care That Walks With You',
      date: 'November 18, 2025',
      excerpt: 'When my father started slowing down, it wasn\'t one big event. It was gradual. Hospital visits stretched longer. Food lost its appeal. And the house grew quieter in ways words struggle to describe.',
      category: 'cause-of-serving',
      slug: 'the-care-that-walks-with-you'
    },
    {
      id: 5,
      title: 'Bridging Generations: Reimagining Ageing as a Shared Journey',
      date: 'October 30, 2025',
      excerpt: 'In a world continuously reshaped by migration, digital transformation, and shifting social norms, the spaces between generations are widening even as technology claims to bring us closer.',
      category: 'cause-of-serving',
      slug: 'bridging-generations-reimagining-ageing'
    },
    {
      id: 6,
      title: 'A Chat About \'GPT\' – Gratitude, Patience & Time',
      date: 'June 6, 2025',
      excerpt: 'Powering our Lives through Core Evergreen Values. In Indian culture, the blessing most often given by our elders is \'Ayushman Bhava\' — may you live long. But what does a long life mean without gratitude?',
      category: 'cause-of-serving',
      slug: 'a-chat-about-gpt-gratitude-patience-and-time'
    },
    {
      id: 7,
      title: 'Viksit Bharat: Society for all Ages?',
      date: 'July 18, 2024',
      excerpt: 'We are all gearing up for Viksit Bharat 2047. We all have our own aspirations and dreams, but where do our elders fit in this vision? A truly developed nation must be one that honours all ages.',
      category: 'general',
      slug: 'viksit-bharat-society-for-all-ages'
    },
    {
      id: 8,
      title: 'Loneliness in Older Adults and Its Impact on Mental Health',
      date: 'January 11, 2024',
      excerpt: 'Even in a world where social media and technology are fostering relationships, loneliness still exists and affects one of the most vulnerable groups in our society — the elderly.',
      category: 'health',
      slug: 'loneliness-in-older-adults-mental-health'
    },
    {
      id: 9,
      title: 'Understanding, Preventing, and Responding to Elder Abuse',
      date: 'January 11, 2024',
      excerpt: 'Elder abuse presents a complex and multifaceted challenge that demands a systematic approach encompassing nuanced identification, proactive prevention, and decisive intervention at every level of society.',
      category: 'cause-of-serving',
      slug: 'understanding-preventing-responding-elder-abuse'
    },
    {
      id: 10,
      title: 'Addressing the Intersection of Age and Disability: Policy Challenges in India',
      date: 'November 27, 2023',
      excerpt: 'Ageing is an inevitable part of life, and it often brings with it an increased likelihood of experiencing disability, both physical and cognitive. India\'s policy framework must evolve to address this reality.',
      category: 'cause-of-serving',
      slug: 'age-and-disability-policy-challenges-india'
    },
    {
      id: 11,
      title: 'Digital Inclusion for Senior Citizens: A Necessity, Not a Luxury',
      date: 'October 15, 2023',
      excerpt: 'As India rapidly digitises its public services, millions of elderly citizens are being left behind. Bridging this gap is not just about technology — it\'s about dignity and access to rights.',
      category: 'general',
      slug: 'digital-inclusion-senior-citizens'
    },
    {
      id: 12,
      title: 'HelpAge India\'s Annual Report 2023-24: Highlights',
      date: 'September 1, 2023',
      excerpt: 'Our Annual Report 2023-24 captures the breadth and depth of HelpAge India\'s work across healthcare, agecare, livelihoods, and advocacy — touching over two million lives.',
      category: 'financials',
      slug: 'annual-report-2023-24-highlights'
    },
  ];

  readonly categories: Category[] = [
    { name: 'Cause of Serving', slug: 'cause-of-serving', count: 44 },
    { name: 'Financials',       slug: 'financials',       count: 7  },
    { name: 'General',          slug: 'general',          count: 5  },
    { name: 'Health',           slug: 'health',           count: 1  },
    { name: 'Leadership',       slug: 'leadership',       count: 2  },
    { name: 'Media Centre',     slug: 'media-centre',     count: 9  },
    { name: 'Our Supporters',   slug: 'our-supporters',   count: 5  },
    { name: 'Sponsor',          slug: 'sponsor',          count: 5  },
    { name: 'Survival',         slug: 'survival',         count: 1  },
    { name: 'Uncategorized',    slug: 'uncategorized',    count: 20 },
  ];

  filteredPosts: BlogPost[] = [];
  pagedPosts:    BlogPost[] = [];
  totalPages = 1;
  pageNumbers: number[] = [];

  ngOnInit(): void {
    this.applyFilters();
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
      const matchCat = this.activeCategory === 'all' || p.category === this.activeCategory;
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
  this.selectedCategory = slug;
  this.activeCategory = slug;
  this.currentPage = 1;
  this.applyFilters();
}

// recent posts
getRecentPosts(): BlogPost[] {
  return this.allPosts.slice(0, 5);
}

}