import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpactStory } from './impact-stories.component';

@Injectable({
  providedIn: 'root'
})
export class ImpactStoryService {

  private apiUrl = 'http://127.0.0.1:8000/api/impact-stories';

  constructor(private http: HttpClient) {}

  getStories(): Observable<ImpactStory[]> {
    return this.http.get<ImpactStory[]>(this.apiUrl);
  }
}