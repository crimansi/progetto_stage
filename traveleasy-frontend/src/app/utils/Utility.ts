import { FormGroup, FormControl} from '@angular/forms';
import { Moment } from 'moment';
import { moment } from './Const';
import { MatDateRangePicker, MatDatepicker } from '@angular/material/datepicker';
import { Passenger } from './Passenger';
import { IAirport } from '../model/IAirports';
import { Subscription, delay } from 'rxjs';
import { FlightSearchService } from '../service/flight-search.service';
import { Router } from '@angular/router';
export class UtilityPassenger{
    passOption: {label:string; option: string} [] =[
        {label:'Any', option:'ANY'},
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
  origin: string = '';
  destination: string = '';
  orIataCode: string = '';
  destIataCode: string = '';
  showSearchFrom: boolean = false;
  showSearchTo: boolean = false;
  showSearchFromOneWay: boolean = false;
  showSearchToOneWay: boolean = false;


  apiCall(sub: Subscription, service: FlightSearchService, dateStart: string, dateEnd: string, adult: number, children: number, infants: number, option: string, router: Router){
      let queryParams: any = {
        origin: this.origin,
        destination: this.destination,
        startDate: dateStart,
        option: option,
        adult: adult
      };
      if(dateEnd){
        queryParams.endDate = dateEnd;
      }
      if (children > 0) {
        queryParams.children = children;
      }
      if (infants > 0) {
        queryParams.infants = infants;
      }
      sub = service.getFlights(this.orIataCode, this.destIataCode, dateStart, dateEnd, adult, children, infants, option, false).subscribe(
        data => {
          sessionStorage.setItem('results', JSON.stringify(data));
          router.navigate(['/flightSearch'],
                {queryParams: queryParams}
          );
        },
      error =>{
        console.log(error);
      });
  }

  receiveData(city: IAirport): void {
    if(this.showSearchFrom || this.showSearchFromOneWay){
      this.origin = city.name + ' (' + city.iataCode + ')';
      this.orIataCode = city.iataCode;
      this.showSearchFrom = false;
      this.showSearchFromOneWay = false;
    } else if(this.showSearchTo || this.showSearchToOneWay){
      this.destination = city.name + ' (' + city.iataCode + ')';
      this.destIataCode = city.iataCode;
      this.showSearchTo = false;
      this.showSearchToOneWay = false;
    }
  }

}