import { Router } from "express";

const router = Router();
// const queryController = require('../controllers/query.controller');
import { 
    getWashroomById, 
    getAllWashrooms, 
    getSingleReport, 
    getAllUserReports, 
    verifyUserReport } from "../controller/query.controller.js"

// Add a new endpoint to find the closest washrooms
router.get('/washrooms/:id', getWashroomById);
router.get('/washrooms', getAllWashrooms);

export default router;