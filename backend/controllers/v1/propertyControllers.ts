import { Request, Response } from 'express';
import * as PropertyService from '../../services/v1/propertyServices'

const createProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const propertyData = req.body;
        const newProperty = await PropertyService.createProperty(propertyData);
        res.status(201).json({ message: 'Property created successfully', newProperty })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await PropertyService.getProperties();
        res.status(200).json({ message: "Properties fetch successfully", properties })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getPropertyById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Please provide a valid id" })
        }
        const property = await PropertyService.getPropertyById(id);
        res.status(200).json({ message: 'Property fetch successfully', property })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error` })
    }
}

const updateProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Please provide a valid Id" })
        }
        const updatedProperty = PropertyService.updateProperty(id, req.body)
        res.status(201).json({ message: "Value updated Successfully", updatedProperty })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const deleteProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Please provide a valid Id" })
        }
        const deletedProperty = await PropertyService.deleteProperty(id);
        res.status(201).json({ message: "Property deleted successfully", deletedProperty })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty }