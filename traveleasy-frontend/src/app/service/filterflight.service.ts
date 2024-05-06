import { Injectable } from '@angular/core';
import { IFlightSearch } from '../model/IFlightSearch';

@Injectable({
  providedIn: 'root'
})
export class FilterflightService {

  constructor() { }
  
  filterResultsByStops(results: IFlightSearch[], selectedStops: number[]): IFlightSearch[] {
    return results.filter(result => {
      const stops = result.itineraries[0].segments.length - 1;
      return selectedStops.includes(stops);
    });
  }

  filterResultsByAirlines(results: IFlightSearch[], selectedAirlines: string[]): IFlightSearch[] {
    return results.filter(result => selectedAirlines.includes(result.itineraries[0].segments[0].carrierCode));
  }

  filterResultsByAirports(results: IFlightSearch[], selectedAirports: string[], isDeparture: boolean): IFlightSearch[] {
    const key = isDeparture ? 'departure' : 'arrival';
    return results.filter(result => selectedAirports.includes(result.itineraries[0].segments[0][key].iataCode));
  }

  sortResultsByPriceLowToHigh(results: IFlightSearch[]): IFlightSearch[] {
    return results.slice().sort((a, b) => {
      const priceA = Number(a.travelerPricings[0].price.base);
      const priceB = Number(b.travelerPricings[0].price.base);
      return priceA - priceB;
    });
  }

  sortResultsByPriceHighToLow(results: IFlightSearch[]): IFlightSearch[] {
    return results.slice().sort((a, b) => {
      const priceA = Number(a.travelerPricings[0].price.base);
      const priceB = Number(b.travelerPricings[0].price.base);
      return priceB - priceA;
    });
  }

  sortResultsByDurationShortest(results: IFlightSearch[]): IFlightSearch[] {
    return results.slice().sort((a, b) => {
      const durationA = this.calculateDurationInMinutes(a.itineraries[0].duration);
      const durationB = this.calculateDurationInMinutes(b.itineraries[0].duration);
      return durationA - durationB;
    });
  }
  
  sortResultsByDurationLongest(results: IFlightSearch[]): IFlightSearch[] {
    return results.slice().sort((a, b) => {
      const durationA = this.calculateDurationInMinutes(a.itineraries[0].duration);
      const durationB = this.calculateDurationInMinutes(b.itineraries[0].duration);
      return durationB - durationA;
    });
  }
  calculateDurationInMinutes(duration: string): number {
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;
    return hours * 60 + minutes;
  }
}
