export interface ITravelers{
    id: string,
    name: {
        firstName: string,
        lastName: string
    },
    dateOfBirth: string
    gender: string
}
export interface ITravelersResponse {
    id: string,
    name: {
        firstName: string,
        lastName: string
    },
    dateOfBirth: string,
    gender: string,
    contact: {
        phone: {
            countryCallingCode: string;
            number: string,
            deviceType: string
        }[]
    },
    documents: {
        documentType: string,
        number: string,
        expiryDate: string,
        issuanceCountry: string,
        nationality: string,
        holder: boolean
    }
}