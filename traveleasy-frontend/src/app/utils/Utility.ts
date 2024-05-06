import { FormGroup, FormControl} from '@angular/forms';
import { Moment } from 'moment';
import { moment } from './Const';
import { MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { Passenger } from './Passenger';
import { IAirport } from '../model/IAirports';
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
      str: string = ' traveler';
    totalPassengers: number = 1;
    totalSeats: number = 1;    
      range: FormGroup = new FormGroup({
        start: new FormControl(moment()),
        end: new FormControl(moment())
      });
      date = new FormControl(moment());
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
      setDate(date: Moment | null, picker: MatDatepicker<Moment>){
        const d= this.date.value ?? moment();
        if(date){
          d.day(date.day());
          d.month(date.month());
          this.date.setValue(d);
          picker.close();
        }
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
          this.str = ' travelers';
        } else {
          this.str = ' traveler';
        }
      }
}
export class UtilitySearch{
  setQueryParams(origin: string, destination: string, start: string, end: string, option: string, adult: number, children: number, infants: number): any{
    let queryParams: any = {
      origin: origin,
      destination: destination,
      startDate: start,
      option: option,
      adult: adult
    };
    if(end){
      queryParams.endDate = end;
    }
    if (children > 0) {
      queryParams.children = children;
    }
    if (infants > 0) {
      queryParams.infants = infants;
    }
    return queryParams;
  }
  //il metodo non funziona, cercherò di capirlo più tardi
  /*setCitySelected(or: string, dest: string, orBol: boolean, destBol: boolean, item: IAirport){
    if(orBol){
      or = item.name + ' (' + item.iataCode + ')';
      orBol= false;
    } else if(destBol){
      dest = item.name + ' (' + item.iataCode + ')';
      destBol = false;
    }
  }*/

}