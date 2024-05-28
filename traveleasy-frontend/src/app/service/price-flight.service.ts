import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map} from 'rxjs';
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
      catchError((error: HttpErrorResponse) => {
        throw Error(error.message);
      })
    );
  }
}
