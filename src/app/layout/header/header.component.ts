import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  mobileMenuOpen = false;
  activeDropdown = '';
  homeSettings: any = null;

  public apiService = inject(ApiService);
  public languageService = inject(LanguageService);
  private router = inject(Router);

  t(key: string): string {
    return this.languageService.translate(key);
  }

  get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }

  setLanguage(lang: 'en' | 'ta'): void {
    this.languageService.setLanguage(lang);
  }

  ngOnInit(): void {
    this.apiService.homeSettings$.subscribe(settings => {
      this.homeSettings = settings;
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.has-dropdown') && !target.closest('.mobile-toggle')) {
      this.activeDropdown = '';
    }
  }

  toggleDropdown(id: string): void {
    this.activeDropdown = this.activeDropdown === id ? '' : id;
  }

  toggleMobile(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobile(): void {
    this.mobileMenuOpen = false;
    this.activeDropdown = '';
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.closeMobile();
  }
}
