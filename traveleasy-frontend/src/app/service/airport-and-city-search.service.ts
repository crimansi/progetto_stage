import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IAirport } from '../model/IAirports';
import { Observable, catchError, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportAndCitySearchService {
  private baseUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient){}
  
  getAirports(keyword: String) : Observable<IAirport[]>{
    return this.http.get<IAirport[]>(
      `${this.baseUrl}?keyword=${keyword}`).pipe(
        tap((response: IAirport[]) => console.log('Risultati della ricerca:', response)),
        catchError((error: HttpErrorResponse) => {
          throw Error(error.message);
        })
      );
  }
}
