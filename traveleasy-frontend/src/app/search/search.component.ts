import { Component, OnInit } from '@angular/core';
import { FlightsearchComponent } from '../flight/flightsearch/flightsearch.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FlightsearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
}

