import { Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor} from '@angular/common';
import { IAirport } from '../../model/IAirports';
import { AirportAndCitySearchService } from '../../service/airport-and-city-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-and-airport-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf],
  templateUrl: './city-and-airport-search.component.html',
  styleUrl: './city-and-airport-search.component.css'
})
export class CityAndAirportSearchComponent implements OnDestroy{
  cityOrAirport: string = '';
  results: IAirport[] = [];
  @Output() citySelected= new EventEmitter<IAirport>;
  searchControl = new FormControl;
  private citySubscription: Subscription;

  constructor(private cityAndAirportService: AirportAndCitySearchService){
    this.citySubscription = new Subscription;
  }

  searchCityOrAirport(){
    if(this.cityOrAirport.length >= 3){
      this.citySubscription = this.cityAndAirportService.getAirports(this.cityOrAirport).subscribe(
        data => {
          this.results = data;
      }
      );
    }
  }

  onSelect(city: IAirport): void{
    this.citySelected.emit(city);
  }

 ngOnDestroy(): void {
  if (this.citySubscription) {
    this.citySubscription.unsubscribe();
  }
 }
}
