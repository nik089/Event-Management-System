import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmsService {
  private apiUrl = 'http://localhost:3000/login';
  private apiUrl1 = 'http://localhost:3000/events';


  constructor(private http: HttpClient) { }

  loginAndNewUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addNewUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }


  // Get all events
  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }

  // Get single event by ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<any>(`${this.apiUrl1}/${id}`);
  }

  // Create new event
  addEvent(event: any): Observable<Event> {
    return this.http.post<any>(this.apiUrl1, event);
  }

  // Update event
  updateEvent(event: any): Observable<Event> {
    return this.http.put<any>(`${this.apiUrl1}/${event.id}`, event);
  }

  // Delete event
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl1}/${id}`);
  }
}
