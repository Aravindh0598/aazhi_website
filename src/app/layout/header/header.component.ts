import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
