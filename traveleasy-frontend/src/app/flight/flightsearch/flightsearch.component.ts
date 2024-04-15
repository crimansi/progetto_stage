import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle } from '@angular/material/datepicker';
import { NgIf, NgFor } from '@angular/common';
import { MatIconButton, MatMiniFabButton, MatButton} from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatPrefix, MatLabel } from '@angular/material/form-field';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import {OverlayModule} from '@angular/cdk/overlay';
import { CityAndAirportSearchComponent } from '../city-and-airport-search/city-and-airport-search.component';
import { IAirport } from '../../model/IAirports';
import { AirportAndCitySearchService } from '../../service/airport-and-city-search.service';
import { Subscription } from 'rxjs';

import { UtilityPassenger } from '../../utils/Utility';


@Component({
  selector: 'app-flightsearch',
  standalone: true,
  imports: [MatIcon, ReactiveFormsModule, FormsModule,  MatDateRangePicker, MatDateRangeInput, MatStartDate,
    MatEndDate, MatDatepickerToggle, NgIf, NgFor, MatIconButton, MatMiniFabButton, MatButton, MatInput,
    MatFormField, MatPrefix, MatLabel, MatChipListbox, MatChipOption, OverlayModule, CityAndAirportSearchComponent],
  templateUrl: './flightsearch.component.html',
  styleUrl: './flightsearch.component.css'
})
export class FlightsearchComponent implements OnDestroy{
  origin: string = '';
  destination: string = '';
  showSearchFrom: boolean = false;
  showSearchTo: boolean = false;
  showTrav: boolean = false;
  private citySubscription: Subscription;
  u = new UtilityPassenger();
  selectedOption = this.u.passOption[0];

  constructor(cityAndAirportService: AirportAndCitySearchService, private router: Router){
    this.citySubscription = cityAndAirportService.selected$.subscribe((city: IAirport) => {
      if(this.showSearchFrom){
        origin = city.name + ' (' + city.iataCode + '), ' + city.address.countryName;
        this.showSearchFrom = false;
      } else if(this.showSearchTo){
        this.destination = city.name + ' (' + city.iataCode + '), ' + city.address.countryName;
        this.showSearchTo = false;
      }
    })
  }
  ngOnDestroy(): void {
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
  }
  
  @ViewChild('rangeInput') rangeInput!: MatDateRangePicker<Date>;
  
  openPicker(): void {
    this.rangeInput.open();
  }
  swapInput(){
    const temp = this.origin;
    this.origin = this.destination;
    this.destination = temp;
  }
  
  searchFlight(){
    let queryParams: any = {
      origin: this.origin,
      destination: this.destination,
      startDate: this.u.range.value.start.format('YYYY-MM-DD'),
      endDate: this.u.range.value.end.format('YYYY-MM-DD'),
      option: this.selectedOption.option,
      adult: this.u.passengers.adult
    };
    if (this.u.passengers.children > 0) {
      queryParams.children = this.u.passengers.children;
    }
    if (this.u.passengers.infants > 0) {
      queryParams.infants = this.u.passengers.infants;
    }
    this.router.navigate(['/flightSearch'], { queryParams });
    
  }
}
