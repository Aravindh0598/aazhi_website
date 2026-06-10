import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Use the full URL to the Laravel backend
  private apiUrl = 'http://localhost:8000/api';
  readonly storageUrl = 'http://localhost:8000/storage/';
  private http = inject(HttpClient);

  private homeSettingsSubject = new BehaviorSubject<any>(null);
  homeSettings$ = this.homeSettingsSubject.asObservable();

  /**
   * Fetches the home settings.
   */
  getHomeSettings(lang?: string): Observable<any> {
    const activeLang = lang || (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/home-settings?lang=${activeLang}`).pipe(
      tap(response => {
        if (response.success) {
          this.homeSettingsSubject.next(response.data);
        }
      })
    );
  }

  /**
   * Fetches the welcome images.
   */
  getWelcomeImages(lang?: string): Observable<any> {
    const activeLang = lang || (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/welcome-images?lang=${activeLang}`);
  }

  /**
   * Fetches about content, documents, and governing bodies.
   */
  getAbout(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/about?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Fetches all impact stories.
   */
  getImpactStories(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/impact-stories?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Fetches get involved details.
   */
  getGetInvolved(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/get-involved?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Fetches all blogs.
   */
  getBlogs(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/blogs?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Fetches all contact details.
   */
  getContacts(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/contacts?lang=${activeLang}`);
  }

  /**
   * Fetches all galleries.
   */
  getGalleries(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/galleries?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Fetches all annual reports.
   */
  getAnnualReports(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/annual-reports?lang=${activeLang}`);
  }

  /**
   * Fetches all foundation documents.
   */
  getFoundationDocuments(): Observable<any> {
    const activeLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/foundation-documents?lang=${activeLang}`);
  }

  /**
   * Fetches unified frontend data (HomeSettings, WelcomeImages, About, Blogs, ImpactStories, Galleries, GetInvolved, Contacts).
   */
  getUnifiedData(lang?: string): Observable<any> {
    const activeLang = lang || (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
    return this.http.get<any>(`${this.apiUrl}/frontend/unified?lang=${activeLang}`).pipe(
      map(res => {
        if (res.success && res.data) {
          res.data = this.mapLanguageFields(res.data, activeLang);
        }
        return res;
      })
    );
  }

  /**
   * Subscribes to the newsletter.
   */
  subscribe(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/subscribe`, { email });
  }

  /**
   * Submits a contact form inquiry.
   */
  submitContactForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact-submit`, data);
  }

  /**
   * Submits an involvement request (volunteer, donate, csr, legacy).
   */
  submitInvolvementRequest(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/involvement-submit`, data);
  }

  /**
   * Submits a donation record.
   */
  submitDonation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/donation-submit`, data);
  }

  /**
   * Helper to dynamically map dynamic model fields ending in _ta to their base names when language is Tamil ('ta').
   */
  private mapLanguageFields(data: any, lang: string): any {
    if (!data) return data;
    if (Array.isArray(data)) {
      return data.map(item => this.mapLanguageFields(item, lang));
    }
    if (typeof data === 'object') {
      const mapped = { ...data };
      if (lang === 'ta') {
        if ('event_name_ta' in mapped && mapped.event_name_ta) {
          mapped.event_name = mapped.event_name_ta;
        }
        if ('title_ta' in mapped && mapped.title_ta) {
          mapped.title = mapped.title_ta;
        }
        if ('description_ta' in mapped && mapped.description_ta) {
          mapped.description = mapped.description_ta;
        }
        if ('name_ta' in mapped && mapped.name_ta) {
          mapped.name = mapped.name_ta;
        }
        if ('about_ta' in mapped && mapped.about_ta) {
          mapped.about = mapped.about_ta;
        }
        if ('designation_ta' in mapped && mapped.designation_ta) {
          mapped.designation = mapped.designation_ta;
        }
      }
      for (const key in mapped) {
        if (mapped.hasOwnProperty(key) && mapped[key] && typeof mapped[key] === 'object') {
          mapped[key] = this.mapLanguageFields(mapped[key], lang);
        }
      }
      return mapped;
    }
    return data;
  }
}
