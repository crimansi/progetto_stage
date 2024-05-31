import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { NgIf, NgFor, NgClass } from '@angular/common';
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
import { moment } from '../../utils/Const';
import { Moment } from 'moment';

@Component({
  selector: 'app-flightsearch',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,  MatDateRangePicker, MatDateRangeInput, MatStartDate,
    MatEndDate, MatDatepickerToggle, NgIf, NgFor, MatInput, MatChipListbox, MatChipOption, OverlayModule, 
    CityAndAirportSearchComponent, MatDatepicker, MatDatepickerInput, MatIcon, MatMiniFabButton, MatButton, NgClass],
  templateUrl: './flightsearch.component.html',
  styleUrl: './flightsearch.component.css'
})

export class FlightsearchComponent implements OnDestroy{
  showTrav: boolean = false;
  showOp: boolean = false;
  formSubmitted: boolean = false;
  formSubmittedOneWay: boolean = false;
  u = new UtilityPassenger();
  uSearch = new UtilitySearch();
  selectedOption = this.u.passOption[0];
  flightSubscription: Subscription;
  currentDate = moment().startOf('day');

  constructor(private router: Router, private flightService: FlightSearchService){
    this.flightSubscription = new Subscription;
  }

  swapInput(){
    const temp = this.uSearch.origin;
    this.uSearch.origin = this.uSearch.destination;
    this.uSearch.destination = temp;
    const tempCode = this.uSearch.orIataCode;
    this.uSearch.orIataCode = this.uSearch.destIataCode;
    this.uSearch.destIataCode = tempCode;
  }

  searchFlightRoundTrip(){
    this.formSubmitted = true;
    this.formSubmittedOneWay = false;
    console.log(this.currentDate);
    if (this.uSearch.origin && this.uSearch.destination && this.u.range.valid && this.u.totalPassengers > 0 && this.selectedOption && this.u.range.value.start.isSameOrAfter(this.currentDate)){
        this.uSearch.apiCall(this.flightSubscription, this.flightService, this.u.range.value.start.format('YYYY-MM-DD'), this.u.range.value.end.format('YYYY-MM-DD'),
                  this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants, this.selectedOption.option, this.router);
    }
  } 

 searchFlightOneWay(){
    this.formSubmittedOneWay = true;
    this.formSubmitted = false;
    if(this.u.date.value && this.uSearch.origin && this.uSearch.destination && this.u.totalPassengers > 0 && this.selectedOption && this.u.date.value.isSameOrAfter(this.currentDate)){
      this.uSearch.apiCall(this.flightSubscription, this.flightService, this.u.date.value.format('YYYY-MM-DD'), '',
                  this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants, this.selectedOption.option, this.router);
    }
  }

  ngOnDestroy(): void {
    if(this.flightSubscription){
      this.flightSubscription.unsubscribe();
    }
  }

  receiveData(city: IAirport): void {
    this.uSearch.receiveData(city);
  }
}
