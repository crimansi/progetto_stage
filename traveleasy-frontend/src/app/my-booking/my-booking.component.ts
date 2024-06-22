import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyBooking } from '../model/MyBookings';
import { MyBookingService } from '../service/my-booking.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Filter{
  range: string,
  view: string
}

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, MatDivider, MatSelect, MatOption, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit, OnDestroy {
  bookings: MyBooking[] = [];
  ranges: Filter[] = [
    {range: 'any', view: 'None'},
    {range: 'oneWeekAgo', view: 'Last Week'},
    {range: 'oneMonthAgo', view: 'Last Month'},
    {range: 'oneYearAgo', view: 'Last Year'}
  ];
  showAsc: boolean = false;
  selectedRange: Filter = this.ranges[0];
  bookingSubscriptions: Subscription[] = [];
  errorString: string = '';

  constructor(private bookingService: MyBookingService){}

  ngOnInit(): void {
    const tokenUser = sessionStorage.getItem('user');
    if(tokenUser){
      const firstSubscription = this.bookingService.getBookings('').subscribe(data => {
        this.bookings = data;
        });
        this.bookingSubscriptions.push(firstSubscription);
    }
  }

  deleteBook(id: number, startDate: string): void {
    const currentDate = new Date();
    const bookingDate = new Date(startDate);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentWithoutTime = new Date(currentYear, currentMonth, currentDay);
    const bookingYear = bookingDate.getFullYear();
    const bookingMonth = bookingDate.getMonth();
    const bookingDay = bookingDate.getDate();
    const bookingWithoutTime = new Date(bookingYear, bookingMonth, bookingDay);
  if (bookingWithoutTime > currentWithoutTime){
      this.errorString = '';
      const secSubscription = this.bookingService.deleteBooking(id).subscribe( data => {
        const thirdSubscritipn = this.bookingService.getBookings('').subscribe(data => {
          this.bookings = data;
          });
          this.bookingSubscriptions.push(thirdSubscritipn)
      });
      this.bookingSubscriptions.push(secSubscription)
    } else
      this.errorString = 'Cannot delete booking.\n The start date is in the past.';
  }

  applyRangeAndSort(range: string, sort: boolean){
    if(sort){
      const subscription = this.bookingService.selectedRange(range, 'ASC').subscribe(data => {
        this.bookings = data;
      });
      this.bookingSubscriptions.push(subscription)
    }
    else{
      const subscription =  this.bookingService.selectedRange(range, 'DESC').subscribe(data => {
        this.bookings = data;
    });
    this.bookingSubscriptions.push(subscription)
    }
  }

  ngOnDestroy(): void {
      this.bookingSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
