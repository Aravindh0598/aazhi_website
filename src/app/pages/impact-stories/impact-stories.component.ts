import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImpactStory {
  id: number;
  title: string;
  excerpt: string;
  image: string;
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
  imports: [CommonModule],
  templateUrl: './impact-stories.component.html',
  styleUrl: './impact-stories.component.css'
})
export class ImpactStoriesComponent {

  selectedCategory = '';
  currentPage = 1;
  readonly storiesPerPage = 12;

  readonly categories: StoryCategory[] = [
    { name: 'Agecare',                    count: 3  },
    { name: 'Awareness & Advocacy',       count: 1  },
    { name: 'Healthcare',                 count: 4  },
    { name: 'Livelihoods & Emergencies',  count: 5  },
  ];

  readonly allStories: ImpactStory[] = [
    {
      id: 1,
      title: "Angur Rana's Journey from Petals to Profits",
      excerpt: 'From hardship to independence, Angur Rana transformed her life through an Elder-Self-Help-Group, earning a livelihood and accessing essential government benefits.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/08/Angur-Rana.png',
      category: 'Livelihoods & Emergencies',
      slug: 'angur-ranas-journey-from-petals-to-profits',
    },
    {
      id: 2,
      title: 'Tashi Yangdol & the Transformative Power of Care',
      excerpt: "With HelpAge's support, Tashi Yangdol found rehabilitation, mobility and peace at our Leh home, transforming hardship into comfort and hope.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/04/Tashi-Yangdol.webp',
      category: 'Agecare',
      slug: 'tashi-yangdols-transformative-power-of-care',
    },
    {
      id: 3,
      title: 'Sacred Incense Lifts Kasiammal to Independence',
      excerpt: "Through HelpAge's Elder-Self-Help-Group, Kasiammal turned agarbatti-making into financial independence, supporting her family and inspiring her community.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/Kasiammal_Puducherry.jpg',
      category: 'Livelihoods & Emergencies',
      slug: 'kasiammal-case-story-livelihoods',
    },
    {
      id: 4,
      title: 'Kanchan Devi Stitches Together Dreams',
      excerpt: "From disaster to determination, Kanchan Devi used HelpAge's support to build a tailoring enterprise, empowering youth, elders and widows in her village.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/Kanchan-Devi_ESHG-Member_HelpAge-India.jpg',
      category: 'Livelihoods & Emergencies',
      slug: 'kanchan-devi-stitches-together-dreams',
    },
    {
      id: 5,
      title: "Tara Devi's Transformation from Labourer to Agriculturist",
      excerpt: "With HelpAge's support, Tara Devi turned small savings into a successful organic farming business, empowering women and becoming a symbol of rural self-reliance.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/Tara-Devi.jpg',
      category: 'Livelihoods & Emergencies',
      slug: 'tara-devis-transformation-from-labourer-to-agriculturist',
    },
    {
      id: 6,
      title: 'A Lifeline of Care for Nani Gopal',
      excerpt: 'For Nani Gopal and his wife, the Mobile Healthcare Unit provides essential medical care, reassurance and strength to navigate ageing with dignity.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/nani-gopal-gas.jpg',
      category: 'Healthcare',
      slug: 'nani-gopal-das-mhu',
    },
    {
      id: 7,
      title: "How Ningavva Regained Life's Radiance",
      excerpt: "Ningavva's cataract surgery through HelpAge restored her sight, giving her strength, independence and renewed hope after a lifetime of loss.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/Ningavva-Kunnur.jpg',
      category: 'Healthcare',
      slug: 'vision-restoration-regaining-lifes-radiance',
    },
    {
      id: 8,
      title: "Kompelli Yadamma's Story of Weaving Independence",
      excerpt: "From loss to leadership, Yadamma rebuilt her life through HelpAge's Livelihoods support, becoming a source of strength and empowerment for other elders.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/04/Kompelli-Yadamma.webp',
      category: 'Livelihoods & Emergencies',
      slug: 'kompelli-yadammas-story-of-weaving-independence',
    },
    {
      id: 9,
      title: 'When Compassion Guided Vembuli Home',
      excerpt: 'Timely action and gentle care helped Vembuli reunite with the loved ones who feared they had lost him forever.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/04/Vembuli.webp',
      category: 'Agecare',
      slug: 'vembulis-journey-back-home',
    },
    {
      id: 10,
      title: "The Light That Returned to Sena Bai's Days",
      excerpt: 'Quiet suffering turned into hope when timely intervention brought Sena Bai care, protection and renewed confidence.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/04/Sena-Bai.webp',
      category: 'Agecare',
      slug: 'sena-bais-story-of-restoring-light-dignity',
    },
    {
      id: 11,
      title: "Shivpatiya Devi's Journey from Abandonment to Abundant Joy",
      excerpt: 'Abandoned and unable to walk, Shivpatiya Devi found safety, care and renewed independence through dedicated support and a life-changing mobility aid.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/07/Shivpatiya-Devi-1-scaled.jpg',
      category: 'Healthcare',
      slug: 'shivpatiya-devis-journey-to-dignity',
    },
    {
      id: 12,
      title: 'How S. Sreedhar Became a Champion for Digital Safety',
      excerpt: "Mr. Sreedhar's journey from participant to advocate of HelpAge's Digital Safety programme has strengthened retired railway employees' confidence and online security.",
      image: 'https://www.helpageindia.org/wp-content/uploads/2025/07/S.-Sreedhar.webp',
      category: 'Awareness & Advocacy',
      slug: 'securing-seniors-in-a-digital-world',
    },
    {
      id: 13,
      title: "Meena's Second Chance at Sight",
      excerpt: 'A routine eye check-up by HelpAge\'s mobile team uncovered cataracts in both eyes. Within weeks, Meena could see her grandchildren\'s faces clearly for the first time in years.',
      image: 'https://www.helpageindia.org/wp-content/uploads/2024/09/Ningavva-Kunnur.jpg',
      category: 'Healthcare',
      slug: 'meenas-second-chance-at-sight',
    },
  ];

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