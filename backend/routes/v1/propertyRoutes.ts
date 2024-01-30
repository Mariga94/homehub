import express from 'express';
import * as PropertyController from '../../controllers/v1/propertyControllers';
import authenticateUser from '../../middlewares/authMiddleware'
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Properties
 *  description: API endpoints for managing properties
 */

/**
 * @swagger
 * /api/property:
 *   post:
 *     summary: "Create a new Property"
 *     description: "Create a new property with the provided details"
 *     tags:
 *       - "Properties"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: "Property details"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyInput'
 *     responses:
 *       200:
 *         description: "Successfully created a new property"
 *       401:
 *         description: "Unauthorized, user not authenticated"
 *       500:
 *         description: "Internal Server Error"
 */


router.post('/', PropertyController.createProperty);
router.get('/', PropertyController.getProperties);
router.get('/user', PropertyController.getUserProperties);
router.get('/for-sale', PropertyController.getPropertiesForSale);
router.get('/latest/for-sale', PropertyController.getPropertiesForSale);
router.get('/latest/for-rent', PropertyController.getPropertiesForRent);
router.get('/for-rent', PropertyController.getPropertiesForRent);
router.get('/:id', PropertyController.getPropertyById);
router.put('/:id', PropertyController.updateProperty);
router.delete('/:id', PropertyController.deleteProperty);


export default router
