import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  activeWorkTab: 'healthcare' | 'agecare' | 'livelihoods' | 'advocacy' = 'healthcare';

  currentSlide = 0;
  heroSlide = 0;

  private slideInterval: any;
  private heroSlideInterval: any;

  workTabs: any[] = [];
  programsMap: any = {};
  stats: any[] = [];
  impactStories: any[] = [];
  heroSlides: any[] = [];
  heroSettings: any = null;

  public apiService = inject(ApiService);
  private http = inject(HttpClient);
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }

  getTabLabel(tab: any): string {
    const key = 'home.wwd.tab.' + tab.id;
    const translated = this.languageService.translate(key);
    return translated !== key ? translated : tab.label;
  }

  get isTa(): boolean {
    return this.languageService.getCurrentLanguage() === 'ta';
  }

  // Involvement Form Logic
  showInvolvementModal = false;
  involvementLoading = false;
  involvementSuccess = false;
  
  involvementForm = {
    type: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  };



  constructor() {}

  get currentPrograms() {
    return this.programsMap[this.activeWorkTab] ?? [];
  }

  /** Resolves the 3 CTA hero buttons from backend settings (lang-aware) with static defaults */
  get heroButtons(): { label: string; link: string; style: string; icon?: string }[] {
    const s = this.heroSettings;
    return [
      {
        // Label: always use backend value (already Tamil/EN from API ?lang=); fallback if missing
        label: s?.hero_btn1_title || 'What We Do',
        // Link: use backend link only when active=1 and link is set; else default route
        link:  (s?.hero_btn1_active && s?.hero_btn1_link) ? s.hero_btn1_link : '/about-us',
        style: 'btn-primary'
      },
      {
        label: s?.hero_btn2_title || 'Support Now',
        link:  (s?.hero_btn2_active && s?.hero_btn2_link) ? s.hero_btn2_link : '/donate',
        style: 'btn-secondary donate-btn',
        icon:  'fa-solid fa-heart heart-icon'
      },
      {
        label: s?.hero_btn3_title || 'Get Involved',
        link:  (s?.hero_btn3_active && s?.hero_btn3_link) ? s.hero_btn3_link : '/get-involved',
        style: 'btn-ghost'
      }
    ];
  }

  ngOnInit(): void {

    // Load static JSON data for tabs/programs
    this.http.get<any>('/assets/data/home-data.json').subscribe(data => {
      this.workTabs = data.workTabs;
      this.programsMap = data.programsMap;
      this.stats = data.stats;
      if (!this.impactStories.length) this.impactStories = data.impactStories;
      if (!this.heroSlides.length) this.heroSlides = data.heroSlides;
    });

    // Fetch Hero Settings (title, subtitle, buttons, stats) from backend
    this.apiService.getHomeSettings().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.heroSettings = res.data;
          // Override stats from backend if available
          const s = res.data;
          if (s.hero_stat1_number) {
            this.stats = [
              { value: s.hero_stat1_number, label: s.hero_stat1_title || 'Years of Service' },
              { value: s.hero_stat2_number, label: s.hero_stat2_title || 'States Covered' },
              { value: s.hero_stat3_number, label: s.hero_stat3_title || 'Lives Impacted' },
              { value: s.hero_stat4_number, label: s.hero_stat4_title || 'Mobile Health Units' },
            ];
          }
        }
      },
      error: (err) => console.error('Failed to load hero settings', err)
    });

    // Fetch dynamic Hero Slides (Welcome Images)
    this.apiService.getWelcomeImages().subscribe({
      next: (response) => {
        // console.log('Home Component - Welcome Images response received:', response);
        if (response.success && response.data && response.data.length) {
          this.heroSlides = response.data.map((item: any) => ({
            img: item.image.startsWith('http') ? item.image : this.apiService.storageUrl + item.image,
            caption: item.title
          }));
          // console.log('Home Component - Formatted hero slides:', this.heroSlides);
        }
      },
      error: (err) => console.error('Failed to load welcome images', err)
    });

    // Fetch dynamic Impact Stories
    this.apiService.getImpactStories().subscribe({
      next: (response) => {
        // console.log('Home Component - Impact Stories response received:', response);
        if (response.success && response.data && response.data.length) {
          this.impactStories = response.data.map((item: any) => ({
            img: item.image.startsWith('http') ? item.image : this.apiService.storageUrl + item.image,
            category: item.tag_category?.name || 'General',
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            title: item.title,
            desc: item.description
          }));
          // console.log('Home Component - Formatted impact stories:', this.impactStories);
        }
      },
      error: (err) => console.error('Failed to load impact stories', err)
    });

    // Impact story slider
    this.slideInterval = setInterval(() => {
      if (this.impactStories.length) {
        this.currentSlide = (this.currentSlide + 1) % this.impactStories.length;
      }
    }, 5000);

    // Hero slider
    this.heroSlideInterval = setInterval(() => {
      if (this.heroSlides.length) {
        this.heroSlide = (this.heroSlide + 1) % this.heroSlides.length;
      }
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    clearInterval(this.heroSlideInterval);
  }

  setTab(tab: string): void {
    this.activeWorkTab = tab as any;
  }

  setHeroSlide(i: number) {
    this.heroSlide = i;
  }

  // --- Involvement Methods ---
  openInvolvement(type: string) {
    this.involvementForm.type = type;
    this.showInvolvementModal = true;
    this.involvementSuccess = false;
  }

  closeInvolvement() {
    this.showInvolvementModal = false;
    this.resetInvolvementForm();
  }

  submitInvolvement() {
    if (!this.involvementForm.name || !this.involvementForm.email || !this.involvementForm.phone) {
      alert('Please fill in required fields (Name, Email, Phone)');
      return;
    }

    this.involvementLoading = true;
    this.apiService.submitInvolvementRequest(this.involvementForm).subscribe({
      next: (res) => {
        this.involvementLoading = false;
        if (res.success) {
          this.involvementSuccess = true;
          setTimeout(() => this.closeInvolvement(), 4000);
        }
      },
      error: (err) => {
        this.involvementLoading = false;
        alert(err.error?.message || 'Submission failed. Please try again.');
      }
    });
  }

  resetInvolvementForm() {
    this.involvementForm = { type: '', name: '', email: '', phone: '', message: '' };
  }
}
