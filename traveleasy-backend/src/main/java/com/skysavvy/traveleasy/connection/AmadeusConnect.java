package com.skysavvy.traveleasy.connection;
import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.resources.FlightOrder.Traveler;
import com.amadeus.referencedata.Locations;
import com.amadeus.resources.*;
import com.amadeus.exceptions.ResponseException;
import com.skysavvy.traveleasy.model.TravelClass;

public enum AmadeusConnect {
    INSTANCE;
    private Amadeus amadeus;
    private AmadeusConnect() {
        this.amadeus = Amadeus
                .builder("iVrnCAeGoPW0v7Fq0uRQitg2Ezfvw0tc", "lqEsDMURa1jbvFhC")
                .build();
    }
    public Location[] location(String keyword) throws ResponseException {
        return amadeus.referenceData.locations.get(Params
                .with("keyword", keyword)
                .and("subType", Locations.ANY));
    }
    public FlightOfferSearch[] flights(String origin, String destination, String departDate, String returnDate, Integer adults, Integer children, Integer infants, TravelClass travelClass, boolean nonStop) throws ResponseException {
        return amadeus.shopping.flightOffersSearch.get(
                Params.with("originLocationCode", origin)
                        .and("destinationLocationCode", destination)
                        .and("departureDate", departDate)
                        .and("returnDate", returnDate)
                        .and("adults", adults)
                        .and("children", children)
                        .and("infants", infants)
                        .and("travelClass", travelClass.toString())
                        .and("nonStop", nonStop)
                        .and("currencyCode", "EUR")
                        .and("max", 32));
    }
    public FlightPrice confirm(FlightOfferSearch offer) throws ResponseException {
        return amadeus.shopping.flightOffersSearch.pricing.post(offer);
    }
    public FlightOrder booking(FlightPrice price, FlightOrder.Traveler[] travels) throws ResponseException{
    return amadeus.booking.flightOrders.post(price, travels);
    }
}

