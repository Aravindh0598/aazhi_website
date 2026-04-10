import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

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

  public apiService = inject(ApiService);
  private http = inject(HttpClient);

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

  ngOnInit(): void {

    // Load static JSON data for tabs/programs (as these aren't in API yet)
    this.http.get<any>('/assets/data/home-data.json').subscribe(data => {
      this.workTabs = data.workTabs;
      this.programsMap = data.programsMap;
      this.stats = data.stats;
      // We'll use these as fallbacks if API is empty
      if (!this.impactStories.length) this.impactStories = data.impactStories;
      if (!this.heroSlides.length) this.heroSlides = data.heroSlides;
    });

    // Fetch dynamic Hero Slides (Welcome Images)
    this.apiService.getWelcomeImages().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length) {
          this.heroSlides = response.data.map((item: any) => ({
            img: item.image.startsWith('http') ? item.image : this.apiService.storageUrl + item.image,
            caption: item.title
          }));
        }
      },
      error: (err) => console.error('Failed to load welcome images', err)
    });

    // Fetch dynamic Impact Stories
    this.apiService.getImpactStories().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length) {
          this.impactStories = response.data.map((item: any) => ({
            img: item.image.startsWith('http') ? item.image : this.apiService.storageUrl + item.image,
            category: item.tag_category?.name || 'General',
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            title: item.title,
            desc: item.description
          }));
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
