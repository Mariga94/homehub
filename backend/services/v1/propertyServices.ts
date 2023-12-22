import PropertyModel, { IProperty } from "../../models/v1/propertyModel";

const createProperty = async (propertyData: IProperty): Promise<IProperty | null> => {
    try {
        const newProperty = await PropertyModel.create(propertyData);
        return newProperty
    } catch (error: any) {
        throw new Error(`Error creating property ${error.message}`)
    }
}

const updateProperty = async (id: string, update: Partial<IProperty>): Promise<IProperty | null> => {
    try {
        const updatedProperty = await PropertyModel.findByIdAndUpdate(id, update, { new: true });
        return updatedProperty
    } catch (error: any) {
        throw new Error(`Error updating property: ${error.message}`)
    }
}

const getPropertyById = async (id: string): Promise<IProperty | null> => {
    try {
        const property = await PropertyModel.findById(id);
        return property
    } catch (error: any) {
        throw new Error(`Error fetching property with ${id}: ${error.message}`)
    }
}

const getProperties = async (): Promise<IProperty[] | null> => {
    try {
        const properties = await PropertyModel.find()
        return properties
    } catch (error:any) {
        throw new Error(`Error fetching properties ${error.message}`)
    }
}

const deleteProperty = async (id: string) => {
    try {
        return await PropertyModel.findByIdAndDelete(id)

    } catch (error:any) {
        throw new Error(`Error deleting property: ${error.message}`);
    }
};


export { createProperty, updateProperty, deleteProperty, getProperties, getPropertyById }