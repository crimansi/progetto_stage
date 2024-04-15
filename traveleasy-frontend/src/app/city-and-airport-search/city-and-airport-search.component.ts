import { Component } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatPrefix} from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-city-and-airport-search',
  standalone: true,
  imports: [MatFormField, MatInput, MatPrefix, ReactiveFormsModule, FormsModule, NgFor, NgIf],
  templateUrl: './city-and-airport-search.component.html',
  styleUrl: './city-and-airport-search.component.css'
})
export class CityAndAirportSearchComponent {

}
