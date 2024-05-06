package com.skysavvy.traveleasy.controller;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.*;
import com.google.gson.JsonArray;
import com.skysavvy.traveleasy.connection.AmadeusConnect;
import com.skysavvy.traveleasy.connection.DatabaseConnect;
import com.skysavvy.traveleasy.payload.request.BookingRequest;
import com.skysavvy.traveleasy.model.TravelClass;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api")
public class FlightApiController {

    @GetMapping("/locations")
    public Location[] locations(@RequestParam(required=true) String keyword) throws ResponseException {
        return AmadeusConnect.INSTANCE.location(keyword);
    }

    @GetMapping("/flights")
    public FlightOfferSearch[] flights(@RequestParam(required=true) String origin,
                                       @RequestParam(required=true) String destination,
                                       @RequestParam(required=true) String departDate,
                                       @RequestParam(required = false) String returnDate,
                                       @RequestParam(required=true) Integer adults,
                                       @RequestParam(required = false, defaultValue = "0") Integer children,
                                       @RequestParam(required = false, defaultValue = "0") Integer infants,
                                       @RequestParam(required = false, defaultValue = "ECONOMY") TravelClass travelClass,
                                       @RequestParam(required = false, defaultValue = "false") boolean nonStop)
            throws ResponseException {
        return AmadeusConnect.INSTANCE.flights(origin, destination, departDate, returnDate, adults,children, infants, travelClass, nonStop);
    }
    @PostMapping("/confirm")
    public FlightPrice confirm(@RequestBody(required=true) FlightOfferSearch search) throws ResponseException {
        return AmadeusConnect.INSTANCE.confirm(search);
    }

    @PostMapping("/traveler")
    public FlightOrder.Traveler[] traveler(@RequestBody(required=true)
    JsonArray travelerInfo) {
        return DatabaseConnect.traveler(travelerInfo);
    }
    @PostMapping("/booking")
    public FlightOrder booking(@RequestBody(required=true)BookingRequest request) throws ResponseException {
        FlightPrice flightPrice = request.getFlightPrice();
        FlightOrder.Traveler[] travelers = request.getTravelers();
        return AmadeusConnect.INSTANCE.booking(flightPrice, travelers);
    }

}
