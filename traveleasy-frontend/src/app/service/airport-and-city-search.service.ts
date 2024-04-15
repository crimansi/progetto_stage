import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IAirport, IAirportsResponse } from '../model/IAirports';
import { Subject, Observable, tap, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportAndCitySearchService {
  private baseUrl = 'https://test.api.amadues.com/v1';
  private selectedCA = new Subject<IAirport>();
  selected$ = this.selectedCA.asObservable();
  constructor(private http: HttpClient){}
  //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MILA
  getAirports(keyword: String) : Observable<IAirport[]>{
    return this.http.get<IAirportsResponse>(
      `${this.baseUrl}/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`).pipe(
        tap((response: IAirportsResponse) => console.log('Risultati della ricerca:', response.data)),
        map((response: IAirportsResponse) => response.data));
  }
  
  setSelected(sel: IAirport): void{
    this.selectedCA.next(sel);
  }
}
