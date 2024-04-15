import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsDetailsComponent } from './travels-details.component';

describe('TravelsDetailsComponent', () => {
  let component: TravelsDetailsComponent;
  let fixture: ComponentFixture<TravelsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
