import { TestBed } from '@angular/core/testing';
import { FilterflightService } from './filterflight.service';

describe('FilterflightService', () => {
  let service: FilterflightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterflightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
