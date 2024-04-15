import { Component } from '@angular/core';
import { MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle } from '@angular/material/datepicker';
import { NgIf, NgFor } from '@angular/common';
import { MatButton} from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatPrefix, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilityPassenger } from '../utils/Utility';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-hotelsearch',
  standalone: true,
  imports: [MatDateRangePicker, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, NgIf, NgFor, MatButton, MatInput,  MatFormField, 
    MatPrefix, MatLabel, ReactiveFormsModule, FormsModule, MatIcon],
  templateUrl: './hotelsearch.component.html',
  styleUrl: './hotelsearch.component.css'
})
export class HotelsearchComponent {
  u = new UtilityPassenger();
}
