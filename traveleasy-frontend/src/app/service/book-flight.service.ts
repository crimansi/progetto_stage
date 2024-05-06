import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITravelersResponse } from '../model/ITravelers';
import { IPriceFlight } from '../model/IPriceFlight';
import { Observable } from 'rxjs';
import { IBookingFlight } from '../model/IBooking';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {
  private baseUrl = 'http://localhost:8080/api/booking';
  constructor(private http: HttpClient) { }

  bookFlight(flightPrice: IPriceFlight, travelers: ITravelersResponse[]): Observable<IBookingFlight>{
    const request = {
      flightPrice: flightPrice,
      travelers: travelers
    };
    return this.http.post<IBookingFlight>(this.baseUrl, request);
  }
}
