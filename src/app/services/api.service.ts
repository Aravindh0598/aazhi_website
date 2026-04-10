import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Use the full URL to the Laravel backend
  private apiUrl = 'http://localhost:8000/api';
  private http = inject(HttpClient);

  private homeSettingsSubject = new BehaviorSubject<any>(null);
  homeSettings$ = this.homeSettingsSubject.asObservable();

  /**
   * Fetches the home settings.
   */
  getHomeSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home-settings`).pipe(
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
  getWelcomeImages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/welcome-images`);
  }

  /**
   * Fetches about content, documents, and governing bodies.
   */
  getAbout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/about`);
  }

  /**
   * Fetches all impact stories.
   */
  getImpactStories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/impact-stories`);
  }

  /**
   * Fetches get involved details.
   */
  getGetInvolved(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-involved`);
  }

  /**
   * Fetches all blogs.
   */
  getBlogs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/blogs`);
  }

  /**
   * Fetches all contact details.
   */
  getContacts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts`);
  }

  /**
   * Fetches all galleries.
   */
  getGalleries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/galleries`);
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
}
