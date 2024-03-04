import { Router } from "express";

const router = Router();
const queryController = require('../controllers/query.controller');

// Add a new endpoint to find the closest washrooms
router.get('/washrooms/:id', queryController.getWashroomById);
router.get('/washrooms', queryController.getAllWashrooms);
router.post('/findClosestWashrooms', queryController.findClosestWashroomsController);

// ... other endpoints ...

export default router;