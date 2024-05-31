import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, map, tap} from 'rxjs';
import { IFlightSearch } from '../model/IFlightSearch';
import { IPriceFlight } from '../model/IPriceFlight';
@Injectable({
  providedIn: 'root'
})
export class PriceFlightService {
  private baseUrl = 'http://localhost:8080/api/confirm';

  

  constructor(private http: HttpClient) { }

  getPriceFlight(offer: IFlightSearch): Observable <IPriceFlight>{
    return this.http.post<IPriceFlight>(this.baseUrl, offer).pipe(
      tap((response: IPriceFlight) => {
      }),
      catchError((error: HttpErrorResponse) => {
        throw Error(error.message);
      })
    );
  }
}
