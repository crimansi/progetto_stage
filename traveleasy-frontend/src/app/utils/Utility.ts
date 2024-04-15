import { FormGroup, FormControl} from '@angular/forms';
import { Moment } from 'moment';
import { moment } from './Const';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { Passenger } from './Passenger';
export class UtilityPassenger{
    passOption: {label:string; option: string} [] =[
        {label: 'Economy', option: 'ECONOMY'},
        {label: 'Premium Economy', option: 'PREMIUM_ECONOMY'},
        {label: 'Business', option: 'BUSINESS'},
        {label: 'First', option: 'FIRST'}
      ];
      passengers: Passenger = {
        adult: 1,
        children: 0,
        infants: 0
      }
      str: string = ' traveller';
    totalPassengers: number = 1;
    totalSeats: number = 1;    
      range: FormGroup = new FormGroup({
        start: new FormControl(moment()),
        end: new FormControl(moment())
      });
      setRange(start: Moment, end:Moment, picker: MatDateRangePicker<Moment>) {
        const s = this.range.value.start.value ?? moment();
        const e = this.range.value.end.value ?? moment();
        s.day(start.day());
        s.month(start.month());
        e.day(start.day());
        e.month(start.month());
        this.range.setValue({ s, e });
        picker.close();
      }
      passengerTypes: { label: string; type: keyof Passenger; description: string}[] = [
        { label: 'Adults', type: 'adult', description: '12 and older'},
        { label: 'Children', type: 'children', description: 'Age 2 through 11'},
        { label: 'Infants', type: 'infants', description: 'Younger than 2'}
      ];
      isIncremetentDisabilited(type: keyof Passenger): boolean {
        if((type != 'infants' && this.totalSeats ==9) || (type=='infants' && this.passengers[type] == this.passengers['adult']))
          return true; 
        else
          return false;
      }
      isDecrementDisabilited(type: keyof Passenger): boolean{
        if((type == 'adult' && this.passengers[type] == 1) || (type != 'adult' && this.passengers[type] == 0))
          return true;
        else
          return false;
      }
      incrementPassenger(type: keyof Passenger){
        this.passengers[type]++;
      }
      decrementPassenger(type: keyof Passenger){
        if(type == 'adult'){
          if(this.passengers['adult'] > 1)
            this.passengers[type]--;
        } else {
          if(this.passengers[type] > 0)
            this.passengers[type]--;
        }
      }
      calculateTotal(){
        this.totalPassengers = this.passengers.adult + this.passengers.children + this.passengers.infants;
        this.totalSeats = this.passengers.adult + this.passengers.children;
        if(this.totalPassengers > 1){
          this.str = ' travellers';
        } else {
          this.str = ' traveller';
        }
      }
      
}