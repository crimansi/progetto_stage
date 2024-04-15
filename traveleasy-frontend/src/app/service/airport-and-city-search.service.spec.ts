import { TestBed } from '@angular/core/testing';

import { AirportAndCitySearchService } from './airport-and-city-search.service';

describe('AirportAndCitySearchService', () => {
  let service: AirportAndCitySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportAndCitySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
