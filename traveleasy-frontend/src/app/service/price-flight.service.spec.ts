import { TestBed } from '@angular/core/testing';
import { PriceFlightService } from './price-flight.service';

describe('PriceFlightService', () => {
  let service: PriceFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
