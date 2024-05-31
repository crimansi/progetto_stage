import { Routes } from '@angular/router';
import { FlightsearchComponent } from './flight/flightsearch/flightsearch.component';
import { FlightSearchResultComponent } from './flight/flight-search-result/flight-search-result.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { TravelsDetailsComponent } from './flight/travels-details/travels-details.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { MyBookingComponent } from './my-booking/my-booking.component';

export const routes: Routes = [
    {path: 'Flight', component: FlightsearchComponent},
    {path: '',  redirectTo: '/search', pathMatch:'full'},
    {path:'search', component: FlightsearchComponent},
    {path:'flightSearch', component: FlightSearchResultComponent},
    {path: 'flightDetails', component: FlightDetailsComponent},
    {path: 'travelDetails', component: TravelsDetailsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignupComponent},
    {path: 'myBooking', component: MyBookingComponent}
];
