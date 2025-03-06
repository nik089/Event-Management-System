import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmsService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
