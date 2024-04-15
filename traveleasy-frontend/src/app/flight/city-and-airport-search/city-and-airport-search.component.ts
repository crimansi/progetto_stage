import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IAirport } from '../../model/IAirports';
import { AirportAndCitySearchService } from '../../service/airport-and-city-search.service';
import{ MatList, MatListItem}from '@angular/material/list';

@Component({
  selector: 'app-city-and-airport-search',
  standalone: true,
  imports: [MatFormField, MatInput, MatPrefix, MatIcon, ReactiveFormsModule, FormsModule, NgFor, NgIf, MatList, MatListItem, AsyncPipe],
  templateUrl: './city-and-airport-search.component.html',
  styleUrl: './city-and-airport-search.component.css'
})
export class CityAndAirportSearchComponent implements OnInit{
  searchControl = new FormControl;
  results$!: Observable<IAirport[]>;
  constructor(private cityAndAirportSearvice: AirportAndCitySearchService){}
  ngOnInit(): void {
      this.results$ = this.searchControl.valueChanges.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(keyword => this.cityAndAirportSearvice.getAirports(keyword))
      );
  }
  onSelect(item: IAirport): void{
    this.cityAndAirportSearvice.setSelected(item);
  }
 

}
