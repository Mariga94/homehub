import express from 'express';
import * as PropertyController from '../../controllers/v1/propertyControllers';
import authenticateUser from '../../middlewares/authMiddleware'
const router = express.Router();

router.post('/', authenticateUser, PropertyController.createProperty);
router.get('/', authenticateUser, PropertyController.getProperties);
router.get('/:id', authenticateUser, PropertyController.getPropertyById);
router.put('/:id', authenticateUser, PropertyController.updateProperty);
router.delete('/:id', authenticateUser, PropertyController.deleteProperty);

export default router