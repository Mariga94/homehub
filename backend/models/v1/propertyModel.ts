import mongoose, { Document, Schema } from 'mongoose'

// Define the inteface for the User Document

enum PropertyType {
    Apartment = 'apartment',
    Office = 'office',
    Bungalow = 'bungalow',
    Furnished_Apartment = 'furnished apartment',
    Villa = 'villa'
}

enum PropertyStatus {
    Sale = 'sale',
    Rent = 'rent'
}

export interface IProperty extends Document {
    title: string;
    description: string;
    type: PropertyType;
    propertyStatus: PropertyStatus;
    location?: {
        address: string;
        country: string;
        city: string;
        zipCode: string;
        latlng: number[]
    };
    bedrooms: number;
    bathrooms: number;
    floors: number;
    price: number;
    videoUrl?: string;
    features: {
        fireAlarm?: string;
        balcony?: string;
        petFriendly?: string;
        gym?: string;
        elevator?: string
        garden?: string;
        swimmingPool?: string;
        exposedBrick?: string;
        cityView?: string;
        rooftopAccess?: string;
        oceanView?: string;
        scenicView?: string;
        wraparoundDeck?: string;
        fireplace?: string;
        hikingTrails?: string;
        highCeilings?: string;
        backyard?: string;
        spaciousKitchen?: string;
        studyRoom?: string;
        garage?: string;
        parking?: string;
        securitySystem?: string;
    };
    gallery: string[];
    owner: { type: string, ref: string, }
}

const propertySchema = new Schema<IProperty>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: Object.values(PropertyType), required: true },
    propertyStatus: { type: String, enum: Object.values(PropertyStatus), required: true },
    location: {
        address: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: false },
        latlng: { type: [Number], required: false }
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    floors: { type: Number, required: true },
    price: { type: Number, required: true },
    videoUrl: { type: String, required: false },
    features: {
        fireAlarm: { type: String, required: false },
        balcony: { type: String, required: false },
        petFriendly: { type: String, required: false },
        gym: { type: String, required: false },
        elevator: { type: String, required: false },
        garden: { type: String, required: false },
        swimmingPool: { type: String, required: false },
        exposedBrick: { type: String, required: false },
        cityView: { type: String, required: false },
        rooftopAccess: { type: String, required: false },
        oceanView: { type: String, required: false },
        scenicView: { type: String, required: false},
        wraparoundDeck: { type: String, required: false },
        fireplace: { type: String, required: false },
        hikingTrails: { type: String, required: false },
        highCeilings: { type: String, required: false },
        backyard: { type: String, required: false },
        spaciousKitchen: { type: String, required: false },
        studyRoom: { type: String, required: false },
        garage: { type: String, required: false },
        parking: { type: String, required: false },
        securitySystem: { type: String, required: false },
    },
    gallery: { type: [String], required: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

const PropertyModel = mongoose.model<IProperty>('Property', propertySchema)

export default PropertyModel