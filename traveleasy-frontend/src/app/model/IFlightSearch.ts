export interface IFlightSearchResponse{
    meta: {
       count: number;
       [key: string]: any; 
    }
    data: IFlightSearch[];
}
export interface IFlightSearch{
    type: string;
    id: string;
    source: string;
    instanteTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    paymentCardRequired: boolean;
    lastTicketingDate: string;
    lastTicketingDateTime: string;
    numberOfBookableSeats: number;
    itineraries:{
        duration: string;
        segments: IFlight[];
    }
    price: IPrice;
    pricingOptions: {
        fareType: string[];
        includedCheckedBagsOnly: boolean;
    }
    validationAirlineCodes: string[];
    travelerPricings: ITravPricing[];
}


export interface IFlight{
    departure: {
        iataCode: string;
        terminal: string;
        at: string;
    }
    arrival: {
        iataCode: string;
        terminal: string;
        at: string;
    }
    carrierCode: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
    number: string;
    stops: IStop[];
}
export interface IStop{
    iataCode: string;
    duration: string;
    arrivalAt: string;
    departureAt: string;
}
export interface IPrice{
    currency: string;
    total: string;
    base: string;
    fees: IFees[];
    grandTotal: string;
    billingCurrency: string;
    additionalServices: IFees[]
}
export interface IFees{
    amount: string;
    type: string;
}

export interface ITravPricing{
    travelerId: string;
    fareOption: string;
    travelerType: string;
    associatedAdultId: string
    price: IPrice;
    fareDatailsBySegment: IDetSeg[];
}
export interface IDetSeg{
    segmentId: string;
    cabin: string;
    brandedFareLabel: string;
    class : string;
    includeCheckedBags: {
        quantity: number;
        weight: number;
        weightUnit: string;
    }
    amenities: IAmenities[];
    additionalServices: {
        changeableCheckedBags: {
            quantity: number;
            weight: number;
            weightUnit: string;
            id: string;
        }
        chargeableSeat: {
            id: string;
            number: string;
        }
        chargeableSeatNumber: string;
        otherServices: string[];
    }
}
export interface IAmenities{
    description: string;
    isChargeable: boolean;
    amenityType: string;
    amenityProvider: {
        name: string
    }
}