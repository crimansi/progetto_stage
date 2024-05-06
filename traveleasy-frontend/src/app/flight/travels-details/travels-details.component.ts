import { Component, OnDestroy } from '@angular/core';
import {MatSelect, MatOption} from '@angular/material/select';
import { IFlightSearch } from '../../model/IFlightSearch';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbDateStruct, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { ITravelers, ITravelersResponse } from '../../model/ITravelers';
import { TravelersService } from '../../service/travelers.service';
import { BookFlightService } from '../../service/book-flight.service';
import { IPriceFlight } from '../../model/IPriceFlight';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-travels-details',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule, MatSelect, MatOption, NgbDatepickerModule],
  templateUrl: './travels-details.component.html',
  styleUrl: './travels-details.component.css'
})
export class TravelsDetailsComponent implements OnDestroy {
offerFlight: IFlightSearch[] = [];
private subscriptions: Subscription[] = [];
priceFlight: IPriceFlight = {
  type: '',
  flightOffers: [],
  bookingRequirements: {
    emailAddressRequired: false,
        mobilePhoneNumberRequired: false,
        travelerRequirements: []
  }
}
travelers: ITravelers[] = [];
travResponse: ITravelersResponse[] = [];
dateOfBirthNonFormat:  NgbDateStruct[] = [];
genders: string [] = ['MALE', 'FEMALE'];
booked: boolean = false;
constructor(private travelerService: TravelersService, private bookService: BookFlightService){
  let offer = sessionStorage.getItem('clickPrice');
  if(offer){
    this.priceFlight = JSON.parse(offer);
    this.offerFlight = this.priceFlight.flightOffers;
    if(this.offerFlight && this.offerFlight.length > 0){
      this.travelers = new Array(this.offerFlight[0].travelerPricings.length).fill(null).map(() => ({
        id: '',
        name: {
          firstName: '',
          lastName: ''
        },
        dateOfBirth: '',
        gender: ''
      }));
      this.dateOfBirthNonFormat = new Array(this.offerFlight[0].travelerPricings.length).fill(null).map(() => ({
        day: 0,
        month: 0,
        year: 0
      }));

    }
  }
  }
  bookNow(){
    const formattedDates = this.dateOfBirthNonFormat.map(date => this.formatDate(date));
    for(let i = 0; i<this.travelers.length; i++){
      this.travelers[i].id = this.offerFlight[0].travelerPricings[i].travelerId;
      this.travelers[i].dateOfBirth = formattedDates[i];
    }
    console.log('trav: ', this.travelers);
    const addTravelersSubscription = this.travelerService.addTravelers(this.travelers).subscribe(data => {
      this.travResponse = data;
      console.log('travelers: ', this.travResponse);

      const bookFlightSubscription = this.bookService.bookFlight(this.priceFlight, this.travResponse).subscribe(bookingData => {
        console.log('Booking data: ', bookingData);
        localStorage.setItem('bookedFlight', JSON.stringify(bookingData)); //istruzione temporanea
        this.booked = true;
      });

      this.subscriptions.push(bookFlightSubscription);
    });

    this.subscriptions.push(addTravelersSubscription);

  }
  formatDate(date: NgbDateStruct): string {
    if (date) {
      return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    }
    return '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

