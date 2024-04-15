import { Component, ViewChild } from '@angular/core';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle } from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf, NgFor } from '@angular/common';
import { MatIconButton, MatMiniFabButton, MatButton, MatFabButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatPrefix, MatLabel } from '@angular/material/form-field';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import {OverlayModule} from '@angular/cdk/overlay';
import { CityAndAirportSearchComponent } from '../city-and-airport-search/city-and-airport-search.component';

interface Passenger {
  adult: number;
  children: number;
  infantsOnLap: number;
  infantsInSeat: number;
}

const moment = _rollupMoment || _moment;
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MMM DD', // Formato di input del calendario
  },
  display: {
    dateInput: 'MMM DD', // Formato di visualizzazione dell'input del calendario
    monthYearLabel: 'MMM YYYY', // Formato del mese e dell'anno nel calendario
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-flightsearch',
  standalone: true,
  imports: [MatTabGroup, MatTab, MatTabLabel, MatIcon, ReactiveFormsModule, FormsModule,  MatDateRangePicker, MatDateRangeInput, MatStartDate,
    MatEndDate, MatDatepickerToggle, MatOption, MatSelect, NgIf, NgFor, MatIconButton, MatMiniFabButton, MatButton, MatFabButton, MatInput,
    MatFormField, MatPrefix, MatLabel, MatChipListbox, MatChipOption, OverlayModule, CityAndAirportSearchComponent],
  templateUrl: './flightsearch.component.html',
  styleUrl: './flightsearch.component.css'
})
export class FlightsearchComponent {
  origin: string = '';
  destination: string = '';
  showSearch: boolean = false;
  showTrav: boolean = false;
  totalPassengers: number = 1;
  str: string = ' traveller';
  childrenAges: number[] = Array.from({length: 11}, (_, i) => i + 2);
  infantsAges: number[] = [0, 1];
  passengerOptions: string[]= ['Economy', 'Premium Economy', 'Business', 'First'];
  
  range: FormGroup = new FormGroup({
    start: new FormControl(moment()),
    end: new FormControl(moment())
  });
  

  setRange(start: Moment, end:Moment, picker: MatDateRangePicker<Moment>) {
    const s = this.range.value.start.value ?? moment();
    const e = this.range.value.end.value ?? moment();
    s.day(start.day());
    s.month(start.month());
    e.day(start.day());
    e.month(start.month());
    this.range.setValue({ s, e });
    picker.close();
  }
  @ViewChild('rangeInput') rangeInput!: MatDateRangePicker<Date>;
  
  openPicker(): void {
    this.rangeInput.open();
  }
  createArray(length: number): any[] {
    return new Array(length);
  }
  passengers: Passenger = {
    adult: 1,
    children: 0,
    infantsOnLap: 0,
    infantsInSeat: 0
  }
  passengerTypes: { label: string; type: keyof Passenger; ageLabel?: string }[] = [
    { label: 'Adults', type: 'adult' },
    { label: 'Children', type: 'children', ageLabel: 'Child Age' },
    { label: 'Infants on Lap', type: 'infantsOnLap', ageLabel: 'Infant Age' },
    { label: 'Infants in Seat', type: 'infantsInSeat', ageLabel: 'Infant Age' }
  ];
  isIncremetentDisabilited(type: keyof Passenger): boolean {
    if(this.totalPassengers==9 || (type=='infantsInSeat' && this.passengers['infantsOnLap']>0) || 
      (type=='infantsOnLap' && (this.passengers['infantsInSeat']>0 || this.passengers[type] == this.passengers['adult'])))
      return true; 
    else
      return false;
  }
  isDecrementDisabilited(type: keyof Passenger): boolean{
    if((type == 'adult' && this.passengers[type] == 1) || (type != 'adult' && this.passengers[type] == 0))
      return true;
    else
      return false;
  }
  incrementPassenger(type: keyof Passenger){
    this.passengers[type]++;
  }
  decrementPassenger(type: keyof Passenger){
    if(type == 'adult'){
      if(this.passengers['adult'] > 1)
        this.passengers[type]--;
    } else {
      if(this.passengers[type] > 0)
        this.passengers[type]--;
    }
  }
  calculateTotal(){
    this.totalPassengers = this.passengers.adult + this.passengers.children + this.passengers.infantsInSeat + this.passengers.infantsOnLap;
    if(this.totalPassengers > 1){
      this.str = ' travellers';
    } else {
      this.str = ' traveller';
    }
  }
  swapInput(){
    const temp = this.origin;
    this.origin = this.destination;
    this.destination = temp;
  }
  
}
