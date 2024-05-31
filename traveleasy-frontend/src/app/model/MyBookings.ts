
export interface MyBooking{
    date: Date,
    booking: IBook,
    id: number
}
export interface IBook{
    bookingId: string,
    flight: IFlightBook,
    travelers: ITravelersBooking[]
}
export interface IFlightBook{
    cityDeparture: string,
    cityArrival: string,
    departureTime: string,
    arrivalTime: string,
    cityDepartureReturn: string | null,
    cityArrivalReturn: string | null,
    departureTimeReturn: string | null,
    arrivalTimeReturn: string | null,
    duration: string,
    durationReturn: string,
    airline: string,
    airlineReturn: string,
    travelClass: string
}

export interface ITravelersBooking{
    travelerId: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string
}
