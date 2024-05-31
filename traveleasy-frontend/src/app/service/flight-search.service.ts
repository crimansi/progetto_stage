import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IFlightSearch } from '../model/IFlightSearch';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private baseUrl = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient){}

  getFlights(origin: string, destination: string, departDate: string, returnDate: string, adults: number, children: number, infants: number, travelClass: string, nonStop: boolean): Observable<IFlightSearch[]>{
      let url = `${this.baseUrl}?origin=${origin}&destination=${destination}&departDate=${departDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${travelClass}&nonStop=${nonStop}`;
      if (returnDate !== '') {
        url += `&returnDate=${returnDate}`;
      }
      return this.http.get<IFlightSearch[]>(url).pipe(
        catchError((error: HttpErrorResponse) => {
          throw Error(error.message);
        })
      );
  }
}
