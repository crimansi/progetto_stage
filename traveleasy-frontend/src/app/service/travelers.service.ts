import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITravelers, ITravelersResponse } from '../model/ITravelers';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TravelersService {
  private baseUrl = 'http://localhost:8080/api/traveler'
  constructor(private http: HttpClient) {}

  addTravelers(travelers: ITravelers[]): Observable<ITravelersResponse[]> {
    return this.http.post<ITravelersResponse[]>(this.baseUrl, travelers).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        throw Error(error.message);
      })
    );
  }
}
