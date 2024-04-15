import { Component } from '@angular/core';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { HotelsearchComponent } from '../hotelsearch/hotelsearch.component';
import { CitysearchComponent } from '../citysearch/citysearch.component';
import { FlightsearchComponent } from '../flight/flightsearch/flightsearch.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatTabGroup, MatTab, MatTabLabel, MatIcon, FlightsearchComponent, HotelsearchComponent, CitysearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
}

