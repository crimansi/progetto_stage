import { IFlightSearch } from "./IFlightSearch";

export interface IPriceFlight {
    type: string,
    flightOffers: IFlightSearch[],
    bookingRequirements: {
        emailAddressRequired: boolean,
        mobilePhoneNumberRequired: boolean,
        travelerRequirements: {
            travelerId: string,
            genderRequired: boolean,
            documentRequired: boolean,
            dateOfBirthRequired: boolean,
            redressRequiredIfAny: boolean,
            residenceRequired: boolean
        }[]
    }
}