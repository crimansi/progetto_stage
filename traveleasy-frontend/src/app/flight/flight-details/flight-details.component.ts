import { Component} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common'; 
import {MatDivider} from '@angular/material/divider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [MatButton, MatIcon, NgFor, NgIf, MatDivider],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent {
  showDet: boolean = false;
  constructor(private router: Router){}
  onCheckClick(){
    this.router.navigate(['/travelDetails']);
  }
}
