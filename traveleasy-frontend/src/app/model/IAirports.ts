export interface IAirportsResponse{
    meta: {
        count: number;
        [key: string]: any;
    };
    data: IAirport[];
}
export interface IAirport{
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    id: string;
    iataCode: string;
    address: IAirportAddress;
}
export interface IAirportAddress{
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
}