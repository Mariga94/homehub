import mongoose, { Document, Schema } from 'mongoose'

// Define the inteface for the User Document

enum PropertyType {
    Apartment = 'Apartment',
    Office = 'Office',
    Bungalow = 'Bungalow',
    Furnished_Apartment = 'Furnished Apartment'
}

enum PropertyStatus {
    Sale = 'Sale',
    Rent = 'Rent'
}

export interface IProperty extends Document {
    title: string;
    description: string;
    type: PropertyType;
    propertyStatus: PropertyStatus;
    location: {
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
    videoUrl: string;
    features: {
        fireAlarm: string;
        balcony: string;
        petFriendly: string;
        gym: string;
        elevator: string
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
        fireAlarm: { type: String, required: true },
        balcony: { type: String, required: true },
        petFriendly: { type: String, required: true },
        gym: { type: String, required: true },
        elevator: { type: String, required: true },
    },
    gallery: { type: [String], required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

const PropertyModel = mongoose.model<IProperty>('Property', propertySchema)

export default PropertyModel