import { Routes } from '@angular/router';
import { FlightsearchComponent } from './flight/flightsearch/flightsearch.component';
import { HotelsearchComponent } from './hotelsearch/hotelsearch.component';
import { CitysearchComponent } from './citysearch/citysearch.component';
import { SearchComponent } from './search/search.component';
import { FlightSearchResultComponent } from './flight/flight-search-result/flight-search-result.component';
import { FlightDetailsComponent } from './flight/flight-details/flight-details.component';
import { TravelsDetailsComponent } from './flight/travels-details/travels-details.component';

export const routes: Routes = [
    {path: 'Flight', component: FlightsearchComponent},
    {path: 'Hotel', component: HotelsearchComponent},
    {path: 'ThingsToDo', component: CitysearchComponent},
    {path: '',  redirectTo: '/search', pathMatch:'full'},
    {path:'search', component: SearchComponent},
    {path:'flightSearch', component: FlightSearchResultComponent},
    {path: 'flightDetails', component: FlightDetailsComponent},
    {path: 'travelDetails', component: TravelsDetailsComponent}
];
