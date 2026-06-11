import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-get-involved',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-involved.component.html',
  styleUrl: './get-involved.component.css'
})
export class GetInvolvedComponent implements OnInit {
  involvements: any[] = [];
  row1Involvements: any[] = [];
  row2Involvements: any[] = [];
  loading = true;
  isTa = false;

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.isTa = (typeof window !== 'undefined' && localStorage.getItem('lang')) === 'ta';

    this.apiService.getGetInvolved().subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data)) {
          this.involvements = res.data;
          // Split involvements into rows: first 3 in row 1, subsequent ones in row 2
          this.row1Involvements = this.involvements.slice(0, 3);
          this.row2Involvements = this.involvements.slice(3);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load Get Involved data', err);
        this.loading = false;
      }
    });
  }

  getInvolvementLink(item: any): string {
    if (item.link) {
      return item.link;
    }
    if (item.link_url) {
      return item.link_url;
    }
    const name = (item.tag_category?.name || '').toLowerCase();
    const nameTa = (item.tag_category?.name_ta || '').toLowerCase();
    const hasMatch = (term: string) => name.includes(term) || nameTa.includes(term);

    if (hasMatch('career') || hasMatch('job') || hasMatch('பணிகள்') || hasMatch('வேலை')) {
      return 'https://www.helpageindia.org/careers';
    } else if (hasMatch('corporate') || hasMatch('கார்ப்பரேட்')) {
      return 'https://www.helpageindia.org/get-involved/corporates-activities';
    } else if (hasMatch('volunteer') || hasMatch('தன்னார்வலர்')) {
      return 'https://forms.cloud.microsoft/r/pGi3Nbs72N';
    } else if (hasMatch('intern') || hasMatch('பயிற்சிகள்')) {
      return 'https://forms.cloud.microsoft/r/mHv2y7mJkA';
    } else if (hasMatch('student') || hasMatch('மாணவர்கள்') || hasMatch('save')) {
      return 'https://www.helpageindia.org/save';
    }
    return '/contact';
  }

  getInvolvementButtonText(item: any): string {
    if (this.isTa && item.button_title_ta) {
      return item.button_title_ta;
    }
    if (item.button_title) {
      return item.button_title;
    }
    if (item.button_text) {
      return item.button_text;
    }
    const name = (item.tag_category?.name || '').toLowerCase();
    const nameTa = (item.tag_category?.name_ta || '').toLowerCase();
    const hasMatch = (term: string) => name.includes(term) || nameTa.includes(term);

    if (hasMatch('career') || hasMatch('job') || hasMatch('பணிகள்') || hasMatch('வேலை')) {
      return this.isTa ? 'வேலை வாய்ப்புகளைக் காண்க' : 'View Job Openings';
    } else if (hasMatch('volunteer') || hasMatch('தன்னார்வலர்') || hasMatch('intern') || hasMatch('பயிற்சிகள்')) {
      return this.isTa ? 'இப்போதே விண்ணப்பிக்கவும்' : 'Apply Now';
    } else {
      return this.isTa ? 'மேலும் அறிய' : 'Learn More';
    }
  }

  isStudentTag(item: any): boolean {
    const name = (item.tag_category?.name || '').toLowerCase();
    const nameTa = (item.tag_category?.name_ta || '').toLowerCase();
    return name.includes('student') || nameTa.includes('மாணவர்') || name.includes('save');
  }
}
