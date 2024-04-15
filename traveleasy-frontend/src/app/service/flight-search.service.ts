import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private baseUrl = 'https://test.api.amadues.com/v1';
  constructor(private http: HttpClient){}

}
