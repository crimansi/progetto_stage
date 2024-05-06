import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject, tap, map, BehaviorSubject } from 'rxjs';
import { IFlightSearch } from '../model/IFlightSearch';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private baseUrl = 'http://localhost:8080/api/flights';

  private results = new BehaviorSubject<IFlightSearch[]>([]);
  getResults = this.results.asObservable();
  constructor(private http: HttpClient){}

  getFlights(origin: string, destionation: string, departDate: string, returnDate: string, adult: number, children: number, infants: number, travelClass: string, nonStop: boolean): Observable<IFlightSearch[]>{
    return this.http.get<IFlightSearch[]>(
      `${this.baseUrl}?origin=${origin}&destination=${destionation}&departDate=${departDate}&returnDate=${returnDate}&adults=${adult}&children=${children}&infants=${infants}&travelClass=${travelClass}&nonStop=${nonStop}`).pipe(
        tap((response: IFlightSearch[]) => console.log('Risultati della ricerca:', response)));
  }
 
  setResults(res: IFlightSearch[]){
    this.results.next(res);
    console.log('Voli trovati: ', res);
  }
}
