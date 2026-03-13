import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  constructor(private http: HttpClient) {}

  get currentPrograms() {
    return this.programsMap[this.activeWorkTab] ?? [];
  }

  ngOnInit(): void {

    // Load JSON data
    this.http.get<any>('assets/data/home-data.json').subscribe(data => {
      this.workTabs = data.workTabs;
      this.programsMap = data.programsMap;
      this.stats = data.stats;
      this.impactStories = data.impactStories;
      this.heroSlides = data.heroSlides;
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
}
