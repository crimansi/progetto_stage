import { TestBed } from '@angular/core/testing';

import { TravelersService } from './travelers.service';

describe('TravelersService', () => {
  let service: TravelersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
