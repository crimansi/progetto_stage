import { Routes } from '@angular/router';
import { FlightsearchComponent } from './flight/flightsearch/flightsearch.component';
import { FlightSearchResultComponent } from './flight/flight-search-result/flight-search-result.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { TravelsDetailsComponent } from './flight/travels-details/travels-details.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {path: 'Flight', component: FlightsearchComponent},
    {path: '',  redirectTo: '/search', pathMatch:'full'},
    {path:'search', component: SearchComponent},
    {path:'flightSearch', component: FlightSearchResultComponent},
    {path: 'flightDetails', component: FlightDetailsComponent},
    {path: 'travelDetails', component: TravelsDetailsComponent}
];
