import { Router } from "express";

const router = Router();
import {
  getWashroomById,
  getAllWashrooms,
} from "../controller/query.controller.js";

// Add a new endpoint to find the closest washrooms
router.get("/washrooms/:id", getWashroomById);
router.get("/washrooms", getAllWashrooms);

export default router;
