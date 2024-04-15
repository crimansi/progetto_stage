import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitysearchComponent } from './citysearch.component';

describe('CitysearchComponent', () => {
  let component: CitysearchComponent;
  let fixture: ComponentFixture<CitysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitysearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
