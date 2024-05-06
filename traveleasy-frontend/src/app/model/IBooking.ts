import { IPriceFlight } from "./IPriceFlight";
import { ITravelers } from "./ITravelers";

export interface IBookingFlight{
    type: string;
    id: string;
    queuingOfficeId: string;
    flightPrice: IPriceFlight,
    travelers: ITravelers[]
}