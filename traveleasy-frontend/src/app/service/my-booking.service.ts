import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { MyBooking } from '../model/MyBookings';

@Injectable({
  providedIn: 'root'
})
export class MyBookingService {
  private baseUrl = 'http://localhost:8080/myBookings'
  constructor(private http: HttpClient) { }

  getBookings(sort: string): Observable<MyBooking[]>{
    return this.http.get<MyBooking[]>(`${this.baseUrl}?sort=${sort}`);
  }
  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookingId}`);
  }
  selectedRange(range: string, sort: string): Observable<MyBooking[]>{
    return this.http.get<MyBooking[]>(`${this.baseUrl}/range?range=${range}&sort=${sort}`)
  }
}
