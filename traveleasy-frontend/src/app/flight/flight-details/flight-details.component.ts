import { Component, Input} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common'; 
import { IFlightSearch} from '../../model/IFlightSearch';;
@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [MatButton, NgFor, NgIf],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent {
  @Input() price!: IFlightSearch[];
  @Input() strBags!: string;
  @Input() tax!: string;
  //priceSubscription: Subscription
  constructor(){
    if(this.price){
      console.log('entra1')
      if(this.price.length > 0){
        console.log('entra2')
       
      }
    }
  }
  
}
