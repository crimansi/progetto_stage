package com.skysavvy.traveleasy.controller;

import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.Hotel;
import com.amadeus.resources.HotelBooking;
import com.amadeus.resources.HotelOfferSearch;
import com.google.gson.JsonObject;
import com.skysavvy.traveleasy.connection.AmadeusConnect;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/apiv2")
public class HotelApiController {

    @GetMapping("/hotelsList")
    public Hotel[] getHotelsList(@RequestParam String cityCode) throws ResponseException {
        return AmadeusConnect.INSTANCE.hotels(cityCode);
    }
    @GetMapping("/searchHotels")
    public HotelOfferSearch[] searchHotelsOffer(@RequestParam String hotelIds,
                                                @RequestParam(required = false, defaultValue = "1") Integer adults,
                                                @RequestParam(required = false) String checkInDate,
                                                @RequestParam(required = false) String checkOutDate,
                                                @RequestParam(required = false, defaultValue = "1") Integer roomQuantity
    ) throws ResponseException {
        return AmadeusConnect.INSTANCE.hotelOffers(hotelIds, adults, checkInDate, checkOutDate, roomQuantity);
    }

    @PostMapping("/booking")
    public HotelBooking[] createHotelBooking(@RequestBody JsonObject requestBody) throws ResponseException {
        return AmadeusConnect.INSTANCE.hotelBooking(requestBody);
    }
}
