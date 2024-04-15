import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAndAirportSearchComponent } from './city-and-airport-search.component';

describe('CityAndAirportSearchComponent', () => {
  let component: CityAndAirportSearchComponent;
  let fixture: ComponentFixture<CityAndAirportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityAndAirportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityAndAirportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
