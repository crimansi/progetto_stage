import { Component, OnDestroy } from '@angular/core';
import { MatSelect, MatOption } from '@angular/material/select';
import { IFlightSearch } from '../../model/IFlightSearch';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ITravelers, ITravelersResponse } from '../../model/ITravelers';
import { TravelersService } from '../../service/travelers.service';
import { BookFlightService } from '../../service/book-flight.service';
import { IPriceFlight } from '../../model/IPriceFlight';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-travels-details',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule, MatSelect, MatOption, NgbDatepickerModule, NgClass],
  templateUrl: './travels-details.component.html',
  styleUrls: ['./travels-details.component.css'] // Correzione di styleUrl a styleUrls
})
export class TravelsDetailsComponent implements OnDestroy {
  formSubmit: boolean = false;
  offerFlight: IFlightSearch[] = [];
  private subscriptions: Subscription[] = [];
  showAlert: boolean = false;
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
  dateOfBirthNonFormat: NgbDateStruct[] = [];
  genders: string[] = ['MALE', 'FEMALE'];
  booked: boolean = false;
  error: string = '';

  constructor(private travelerService: TravelersService, private bookService: BookFlightService) {
    let offer = sessionStorage.getItem('clickPrice');
    if (offer) {
      this.priceFlight = JSON.parse(offer);
      this.offerFlight = this.priceFlight.flightOffers;
      if (this.offerFlight && this.offerFlight.length > 0) {
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

  bookNow() {
    this.formSubmit = true;
    if (this.areTravelersValid()) {
      this.error = '';
      const formattedDates = this.dateOfBirthNonFormat.map(date => this.formatDate(date));
      for (let i = 0; i < this.travelers.length; i++) {
        this.travelers[i].id = this.offerFlight[0].travelerPricings[i].travelerId;
        this.travelers[i].dateOfBirth = formattedDates[i];
      }
      console.log('trav: ', this.travelers);
      const userString = sessionStorage.getItem('user');
      if (userString) {
        const addTravelersSubscription = this.travelerService.addTravelers(this.travelers).subscribe(data => {
          this.travResponse = data;
          console.log('travelers: ', this.travResponse);

          const bookFlightSubscription = this.bookService.bookFlight(this.priceFlight, this.travResponse).subscribe(bookingData => {
            console.log('Booking data: ', bookingData);
            this.booked = true;
          });

          this.subscriptions.push(bookFlightSubscription);
        });
        this.subscriptions.push(addTravelersSubscription);
      } else {
        this.showAlert = true;
      }
    } else {
      this.error = 'All traveler fields must be filled.'
    }
  }

  areTravelersValid(): boolean {
    return this.travelers.every(traveler =>
      traveler.name.firstName.trim() !== '' &&
      traveler.name.lastName.trim() !== '' &&
      traveler.dateOfBirth.trim() !== '' &&
      traveler.gender.trim() !== ''
    );
  }

  formatDate(date: NgbDateStruct): string {
    if (date) {
      return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    }
    return '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.showAlert = false;
  }
}
