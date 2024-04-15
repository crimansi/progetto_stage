import { Component, OnDestroy, OnInit} from '@angular/core';
import { MatFormField, MatPrefix, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton, MatMiniFabButton, MatButton } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {MatSelect, MatOption} from '@angular/material/select';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle } from '@angular/material/datepicker';
import{MatCheckbox} from '@angular/material/checkbox';
import { ActivatedRoute, Router} from '@angular/router';
import { UtilityPassenger } from '../../utils/Utility';
import { NgIf, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';



@Component({
  selector: 'app-flight-search-result',
  standalone: true,
  imports: [MatFormField, MatPrefix, MatLabel, MatInput, MatIconButton, MatMiniFabButton, MatButton, MatIcon, OverlayModule, MatDateRangePicker, 
    MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, ReactiveFormsModule, FormsModule, NgFor, NgIf, MatCheckbox, MatSelect, MatOption,
    FlightDetailsComponent, MatDrawer, MatDrawerContainer],
  templateUrl: './flight-search-result.component.html',
  styleUrl: './flight-search-result.component.css'
})
export class FlightSearchResultComponent implements OnDestroy{
  u = new UtilityPassenger();
  origin: string = '';
  destination: string = '';
  showTrav: boolean = false;
  showOp: boolean = false;
  showDet: boolean = false;
  private routeSubscription: Subscription;
  selectedOption = {
    label: '',
    option: ''
  }
  constructor(private route: ActivatedRoute, private router: Router) {
    this.routeSubscription =this.route.queryParamMap.subscribe( params => {
      this.origin = String(params.get('origin'));
      this.destination = String(params.get('destination'));
      this.selectedOption.option = String(params.get('option'));
      const option = this.u.passOption.find(item => item.option == this.selectedOption.option);
      this.selectedOption.label = option ? option.label: '';
      const startDateString = String(params.get('startDate'));
      this.u.range.controls['start'].setValue(startDateString);
      const endDateString = String(params.get('endDate'));
      this.u.range.controls['end'].setValue(endDateString);
      this.u.passengers.adult = Number(params.get('adult'));
      this.u.passengers.children = Number(params.get('children'));
      this.u.passengers.infants = Number(params.get('infants'));
      this.u.calculateTotal();
    }
  );
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  searchFlight(){
    let queryParams: any = {
      origin: this.origin,
      destination: this.destination,
      startDate: this.u.range.value.start,
      endDate: this.u.range.value.end,
      option: this.selectedOption.option,
      adult: this.u.passengers.adult
    };
    if (this.u.passengers.children > 0) {
      queryParams.children = this.u.passengers.children;
    }
    if (this.u.passengers.infants > 0) {
      queryParams.infants = this.u.passengers.infants;
    }
    this.router.navigate(['/flightSearch'],
      {relativeTo: this.route,
      queryParams: queryParams}
    );
  }
  selectedSort: string = '';
  sorts: {index: number; view: string} [] = [
    {index: 0, view: 'Price(lowest to highest'},
    {index: 1, view: 'Price(highest to lowest)'},
    {index: 2, view: 'Duration(shortest)'},
    {index: 3, view: 'Duration(longest)'}
    ];
  onItemClick(){
    this.router.navigate(['/flightDetails'])
  }
}
