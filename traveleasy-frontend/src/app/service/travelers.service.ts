import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITravelers, ITravelersResponse } from '../model/ITravelers';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TravelersService {
  private baseUrl = 'http://localhost:8080/api/traveler'
  constructor(private http: HttpClient) {}

  addTravelers(travelers: ITravelers[]): Observable<ITravelersResponse[]> {
    return this.http.post<ITravelersResponse[]>(this.baseUrl, travelers);
  }
}
