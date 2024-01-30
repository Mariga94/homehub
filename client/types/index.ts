
export interface IUser {
    _id: string;
    fullName: string;
    email: string;
}

export interface featuresInterface {
    balcony?: boolean;
    elevator?: boolean;
    pool?: boolean;
    petFriendly?: boolean;
    gym?: boolean;
    garden?: boolean;
    swimmingPool?: boolean;
    exposedBrick?: boolean;
    cityView?: boolean;
    rooftopAccess?: boolean;
    oceanView?: boolean;
    scenicView?: boolean;
    fireAlarm?: boolean;
    wraparoundDeck?: boolean;
    fireplace?: boolean;
    hikingTrails?: boolean;
    highCeilings?: boolean;
    backyard?: boolean;
    spaciousKitchen?: boolean;
    studyRoom?: boolean;
    garage?: boolean;
    parking?: boolean;
    securitySystem?: boolean;
}

export interface locationInterface {
    address?: string;
    city: string;
    state: string;
    country: string;
}

export interface OwnerInterface {
    _id: string;
    fullName: string;
    email: string;
}

export interface PropertyInterface {
    _id: string;
    title: string;
    description: string;
    type: string;
    propertyStatus: string;
    location: locationInterface;
    bedrooms: number;
    bathrooms: number;
    floors: number;
    price: number;
    area: string;
    size: string;
    videoUrl: string;
    features: featuresInterface;
    gallery: string[];
    owner: OwnerInterface
}