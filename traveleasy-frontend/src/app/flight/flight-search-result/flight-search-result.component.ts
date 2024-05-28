import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {MatSelect, MatOption} from '@angular/material/select';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import {MatCheckbox} from '@angular/material/checkbox';
import { ActivatedRoute, Router} from '@angular/router';
import { UtilityPassenger, UtilitySearch } from '../../utils/Utility';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { CityAndAirportSearchComponent } from '../city-and-airport-search/city-and-airport-search.component';
import { moment } from '../../utils/Const';
import { IAirport } from '../../model/IAirports';
import { IFlightSearch } from '../../model/IFlightSearch';
import { FlightSearchService } from '../../service/flight-search.service';
import { FilterflightService } from '../../service/filterflight.service';
import { PriceFlightService } from '../../service/price-flight.service';
import { IPriceFlight } from '../../model/IPriceFlight';
import {MatDivider} from '@angular/material/divider';
import * as bootstrap from 'bootstrap';

export interface Sort {
  index: number,
  view: string
}


@Component({
  selector: 'app-flight-search-result',
  standalone: true,
  imports: [ MatInput, MatMiniFabButton, MatButton, MatIcon, OverlayModule, MatDateRangePicker, 
    MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, ReactiveFormsModule, FormsModule, NgFor, NgIf, MatCheckbox, MatSelect, MatOption,
    FlightDetailsComponent, CityAndAirportSearchComponent, MatDatepicker, MatDatepickerInput, MatDivider, NgClass],
  templateUrl: './flight-search-result.component.html',
  styleUrl: './flight-search-result.component.css'
})

export class FlightSearchResultComponent implements OnDestroy{
  strName: string = '';
  timeDep: string = '';
  timeArr: string = '';
  tax:string = '';
  strBags: string = '';
  errorString: string = '';
  showTrav: boolean = false;
  showOp: boolean = false;
  showOneWay: boolean = false;
  formSubmitted: boolean = false;
  formSubmittedOneWay: boolean = false;
  u = new UtilityPassenger();
  uSearch = new UtilitySearch();
  setAirline: Set<string> = new Set();
  setDepAir: Set<string> = new Set();
  setArAir: Set<string> = new Set();
  setStopAir: Set<string> = new Set();
  routeSubscription: Subscription;
  results: IFlightSearch[] = []
  selectedOption = {
    label: '',
    option: ''
  }
  selectedSort: number = -1;
  sorts: Sort [] = [
    {index: 0, view: 'Price(lowest to highest)'},
    {index: 1, view: 'Price(highest to lowest)'},
    {index: 2, view: 'Duration(shortest)'},
    {index: 3, view: 'Duration(longest)'}];
  filters: any = {
    selectedStops: [],
    selectedAirlines: [],
    selectedDepartureAirports: [],
    selectedArrivalAirports: []
  };
  filteredResults: IFlightSearch[] = [];
  price: IFlightSearch [] = [];
  priceDetails: IFlightSearch [] = [];
  priceFlight: IPriceFlight = {
    type: '',
    flightOffers: [],
    bookingRequirements: {
      emailAddressRequired: false,
      mobilePhoneNumberRequired: false,
      travelerRequirements: []
    }
  }
  currentDate = moment().startOf('day');

  constructor(private route: ActivatedRoute, private router: Router, private flightService: FlightSearchService, private filterAndSortService: FilterflightService, private priceService: PriceFlightService) {
    this.routeSubscription = this.route.queryParamMap.subscribe( params => {
      this.uSearch.origin = String(params.get('origin'));
      this.uSearch.orIataCode = this.uSearch.origin.slice(-4,-1);
      this.uSearch.destination = String(params.get('destination'));
      this.uSearch.destIataCode = this.uSearch.destination.slice(-4,-1);
      this.selectedOption.option = String(params.get('option'));
      const option = this.u.passOption.find(item => item.option == this.selectedOption.option);
      this.selectedOption.label = option ? option.label: '';
      const startDate = moment(params.get('startDate'));
      if(params.get('endDate')){
        this.u.range.controls['start'].setValue(startDate);
        const endDate = moment(params.get('endDate'));
        this.u.range.controls['end'].setValue(endDate);
      } else {
        this.u.date.setValue(startDate);
        this.showOneWay = true;
      }
      this.u.passengers.adult = Number(params.get('adult'));
      this.u.passengers.children = Number(params.get('children'));
      this.u.passengers.infants = Number(params.get('infants'));
      this.u.calculateTotal();
    });
    let result = sessionStorage.getItem('results');
    if(result){
      this.results = JSON.parse(result);
    }
    for(let result of this.results){
      this.setAirline.add(result.itineraries[0].segments[0].carrierCode);
      this.setDepAir.add(result.itineraries[0].segments[0].departure.iataCode);
      this.setArAir.add(result.itineraries[0].segments[result.itineraries[0].segments.length-1].arrival.iataCode);

    }
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  searchFlight(){
    this.formSubmitted = true;
    this.formSubmittedOneWay = false;
    if (this.uSearch.origin && this.uSearch.destination && this.u.range.valid && this.u.totalPassengers > 0 && this.selectedOption && this.u.range.value.start.isSameOrAfter(this.currentDate)){
        this.uSearch.apiCall(this.routeSubscription, this.flightService, this.u.range.value.start.format('YYYY-MM-DD'), this.u.range.value.end.format('YYYY-MM-DD'),
                  this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants, this.selectedOption.option, this.results, this.router);
    }
  } 
  searchFlightOneWay(){
    this.formSubmittedOneWay = true;
    this.formSubmitted = false;
    if(this.u.date.value && this.uSearch.origin && this.uSearch.destination && this.u.totalPassengers > 0 && this.selectedOption && this.u.date.value.isSameOrAfter(this.currentDate)){
      this.uSearch.apiCall(this.routeSubscription, this.flightService, this.u.date.value.format('YYYY-MM-DD'), '',
                  this.u.passengers.adult, this.u.passengers.children, this.u.passengers.infants, this.selectedOption.option, this.results, this.router);
    }
  }
  receiveData(city: IAirport): void {
    this.uSearch.receiveData(city);
  }
  applySorting() {
    switch (this.selectedSort) {
      case 0:
        this.results = this.filterAndSortService.sortResultsByPriceLowToHigh(this.results);
        break;
      case 1:
        this.results = this.filterAndSortService.sortResultsByPriceHighToLow(this.results);
        break;
      case 2:
        this.results = this.filterAndSortService.sortResultsByDurationShortest(this.results);
        break;
      case 3:
        this.results = this.filterAndSortService.sortResultsByDurationLongest(this.results);
        break;
      default:
        break;
    }
  }
  applyFilters() {
    let result = sessionStorage.getItem('results')
    if (result) {
      this.filteredResults = JSON.parse(result);
    }
    if (this.filters.selectedStops && this.filters.selectedStops.length > 0) {
      this.filteredResults = this.filterAndSortService.filterResultsByStops(this.filteredResults, this.filters.selectedStops);
    }
    if (this.filters.selectedAirlines && this.filters.selectedAirlines.length > 0) {
      this.filteredResults = this.filterAndSortService.filterResultsByAirlines(this.filteredResults, this.filters.selectedAirlines);
    }
    if (this.filters.selectedDepartureAirports && this.filters.selectedDepartureAirports.length > 0) {
      this.filteredResults = this.filterAndSortService.filterResultsByAirports(this.filteredResults, this.filters.selectedDepartureAirports, true);
    }
    if (this.filters.selectedArrivalAirports && this.filters.selectedArrivalAirports.length > 0) {
      this.filteredResults = this.filterAndSortService.filterResultsByAirports(this.filteredResults, this.filters.selectedArrivalAirports, false);
    }
    this.results = this.filteredResults;
  }
  handleStopSelection(event: any, stop: number) {
    if (event.checked) {
      this.filters.selectedStops.push(stop);
    } else {
      const index = this.filters.selectedStops.indexOf(stop);
      if (index !== -1) {
        this.filters.selectedStops.splice(index, 1);
      }
    }
    this.applyFilters();
  }
  handleAirlineSelection(event: any, airline: string) {
    if (event.checked) {
      this.filters.selectedAirlines.push(airline);
    } else {
      const index = this.filters.selectedAirlines.indexOf(airline);
      if (index !== -1) {
        this.filters.selectedAirlines.splice(index, 1);
      }
    }
    this.applyFilters();
  }
  handleDepartureAirportSelection(event: any, airport: string) {
    if (event.checked) {
      this.filters.selectedDepartureAirports.push(airport);
    } else {
      const index = this.filters.selectedDepartureAirports.indexOf(airport);
      if (index !== -1) {
        this.filters.selectedDepartureAirports.splice(index, 1);
      }
    }
    this.applyFilters();
  }
  handleArrivalAirportSelection(event: any, airport: string) {
    if (event.checked) {
      this.filters.selectedArrivalAirports.push(airport);
    } else {
      const index = this.filters.selectedArrivalAirports.indexOf(airport);
      if (index !== -1) {
        this.filters.selectedArrivalAirports.splice(index, 1);
      }
    }
    this.applyFilters();
  }
  onItemClick(item: IFlightSearch){
    this.routeSubscription = this.priceService.getPriceFlight(item).subscribe(data => {
      this.price = data.flightOffers;
      sessionStorage.setItem('clickPrice', JSON.stringify(data));
      const taxNumber = (Number(this.price[0].price.grandTotal) - Number(this.price[0].price.base)).toFixed(2);
      console.log(taxNumber);
      this.tax = String(taxNumber);
      if(this.price[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags){
      if(this.price[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity > 1)
        this.strBags = 'bags';
      } else
        this.strBags = 'bag';
      const testModal = new bootstrap.Modal('#flightdetail',{} );
      testModal.show();
    },
    error => {
      this.errorString = 'Sorry, we couldn\'t find the data you requested. Please try searching again.';
      const testModal = new bootstrap.Modal('#flightdetail',{} );
      testModal.show();
    });
  }
  onBookClick(item: IFlightSearch){
    let stringItem = sessionStorage.getItem('clickPrice');
    if(stringItem){
       this.priceFlight = JSON.parse(stringItem);
       this.priceDetails = this.priceFlight.flightOffers;
      if(this.priceDetails[0].id === item.id){
        this.router.navigate(['/travelDetails']);
      } else{
        this.onBook(item);
      }
    } else {
      this.onBook(item);
    }
  }
  onBook(item: IFlightSearch): void{
    this.routeSubscription = this.priceService.getPriceFlight(item).subscribe(data => {
      this.price = data.flightOffers;
      sessionStorage.setItem('clickPrice', JSON.stringify(data));
      this.router.navigate(['/travelDetails']);
    }, error =>{
      this.errorString = 'Sorry, we couldn\'t find the data you requested. Please try searching again.';
    });
  }
  
}
