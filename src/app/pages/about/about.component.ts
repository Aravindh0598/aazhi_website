import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  aboutContent: any = null;
  aboutDocuments: any[] = [];
  governingBodies: any[] = [];
  members: any[] = [];
  loading = true;
  membersLoading = true;

  public apiService = inject(ApiService);
  public languageService = inject(LanguageService);

  t(key: string): string {
    return this.languageService.translate(key);
  }

  ngOnInit(): void {
    // Fetch About content (governing body, documents, description)
    this.apiService.getAbout().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.aboutContent = res.data.content;
          this.aboutDocuments = res.data.documents;
          this.governingBodies = res.data.governingBodies;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load About Us data', err);
        this.loading = false;
      }
    });

    // Fetch paid members from /api/members
    this.apiService.getMembers().subscribe({
      next: (res) => {
        if (res.success) {
          this.members = res.data;
        }
        this.membersLoading = false;
      },
      error: (err) => {
        console.error('Failed to load members', err);
        this.membersLoading = false;
      }
    });
  }

  getAvatarUrl(name: string): string {
    const encodedName = encodeURIComponent(name || 'Member');
    return `https://ui-avatars.com/api/?name=${encodedName}&background=f47920&color=fff&size=200`;
  }
}
