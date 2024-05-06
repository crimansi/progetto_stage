import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { NgIf, NgFor } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import {OverlayModule} from '@angular/cdk/overlay';
import { CityAndAirportSearchComponent } from '../city-and-airport-search/city-and-airport-search.component';
import { UtilityPassenger, UtilitySearch } from '../../utils/Utility';
import { IAirport } from '../../model/IAirports';
import { FlightSearchService } from '../../service/flight-search.service';
import { IFlightSearch } from '../../model/IFlightSearch';
import { Subscription } from 'rxjs';
import { MatMiniFabButton, MatButton } from '@angular/material/button';

@Component({
  selector: 'app-flightsearch',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,  MatDateRangePicker, MatDateRangeInput, MatStartDate,
    MatEndDate, MatDatepickerToggle, NgIf, NgFor, MatInput, MatChipListbox, MatChipOption, OverlayModule, 
    CityAndAirportSearchComponent, MatDatepicker, MatDatepickerInput, MatIcon, MatMiniFabButton, MatButton],
  templateUrl: './flightsearch.component.html',
  styleUrl: './flightsearch.component.css'
})

export class FlightsearchComponent implements OnDestroy{
  origin: string = '';
  destination: string = '';
  showSearchFrom: boolean = false;
  showSearchTo: boolean = false;
  showTrav: boolean = false;
  showOp: boolean = false;
  u = new UtilityPassenger();
  uSearch = new UtilitySearch();
  selectedOption = this.u.passOption[0];
  results: IFlightSearch[] = [];
  orIataCode: string = '';
  destIataCode: string = '';
  flightSubscription: Subscription;
  formSubmitted: boolean = false;
  constructor(private router: Router, private flightService: FlightSearchService){
    this.flightSubscription = new Subscription;
  }


  swapInput(){
    const temp = this.origin;
    this.origin = this.destination;
    this.destination = temp;
    const tempCode = this.orIataCode;
    this.orIataCode = this.destIataCode;
    this.destIataCode = tempCode;
  }
  
  searchFlightRoundTrip(){
    this.formSubmitted = true;
    if (this.origin && this.destination && this.u.range.valid && this.u.totalPassengers > 0 && this.selectedOption){
          let queryParams = this.uSearch.setQueryParams(this.origin, this.destination, this.u.range.value.start.format('YYYY-MM-DD'), 
        this.u.range.value.end.format('YYYY-MM-DD'), this.selectedOption.option, this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants);
    this.flightSubscription = this.flightService.getFlights(this.orIataCode, this.destIataCode, this.u.range.value.start.format('YYYY-MM-DD'), this.u.range.value.end.format('YYYY-MM-DD'),
      this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants,  this.selectedOption.option, false).subscribe(
      data => {
        this.results = data;
        sessionStorage.setItem('results', JSON.stringify(this.results));
        this.router.navigate(['/flightSearch'],{queryParams});
    }
    );
        }
    
  }
 /* searchFlightOneWay(){
    if(this.u.date.value){
      let queryParams = this.uSearch.setQueryParams(this.origin, this.destination, this.u.date.value.format('YYYY-MM-DD'), '', 
         this.selectedOption.option, this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants)
         this.flightSubscription = this.flightService.getFlights(this.orIataCode, this.destIataCode,this.u.date.value.format('YYYY-MM-DD'), '',
         this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants,  this.selectedOption.option, false).subscribe(
           data => {
             this.results = data;
             this.flightService.setResults(this.results);
             sessionStorage.setItem('results', JSON.stringify(this.results));
             this.router.navigate(['/flightSearch'],{queryParams});
         }
         );
  }
  }*/
  ngOnDestroy(): void {
      if(this.flightSubscription){
        this.flightSubscription.unsubscribe();
      }
  }

  receiveData(city: IAirport): void {
    if(this.showSearchFrom){
      this.origin = city.name + ' (' + city.iataCode + ')';
      this.orIataCode = city.iataCode;
      this.showSearchFrom = false;
    } else if(this.showSearchTo){
      this.destination = city.name + ' (' + city.iataCode + ')';
      this.destIataCode = city.iataCode;
      this.showSearchTo = false;
    }
  }
}
