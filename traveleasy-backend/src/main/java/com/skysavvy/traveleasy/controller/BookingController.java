package com.skysavvy.traveleasy.controller;

import com.amadeus.exceptions.ResponseException;
import com.skysavvy.traveleasy.database.service.BookingService;
import com.skysavvy.traveleasy.model.bookingFlight.Booked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/myBookings")
public class BookingController {
    @Autowired
    BookingService bookingService;
    
    @GetMapping
    public List<Booked> getBookings(@RequestHeader("Authorization") String tokenUser,
                                    @RequestParam String sort) throws ResponseException {
        return bookingService. getAllPublicBookings(tokenUser, sort);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@RequestHeader("Authorization") String tokenUser,
                              @PathVariable(value = "id") Long bookingId) throws ResponseException {
        bookingService.deleteBooking(bookingId);
    }

    @GetMapping("/range")
    public List <Booked> getBookingsInRange(@RequestHeader("Authorization") String tokenUser,
                                            @RequestParam String range,
                                            @RequestParam String sort) throws ResponseException {
        return bookingService.getBookingsFromRange(tokenUser, range, sort);
    }


}
