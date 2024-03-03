import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getManyWashroomRequests,
  getSingleAddWashroomRequest,
  validateAddWashroomRequest,
} from "../controller/admin.controller.js";

const router = Router();
router.use(verifyToken)

router.post("/registerUser", registerUser)

router.post("/loginUser", loginUser);

router.get("/testRestrictedGetRequest", verifyToken, async (req, res) => {
  try {
    res.status(200).json({ response: "This is a super secret message." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Returns a single washroom request from the database.
 * ":id" represents the id of the washroom getting fetched
 */
router.get("/addWashroom/getRequest/:id", getSingleAddWashroomRequest);

/**
 * Adds a new washroom into the database based on body contents and deletes
 * the corresponding washroom request.
 * Requires a nonempty body containing
 * {
 *   name: "name of washroom to be added"
 *   fullAddress: "Address, City, Province PostalCode, Country"
 * }
 */
router.post("/addWashroom/validateRequest/:id", validateAddWashroomRequest);

/**
 * Returns a list of washroom requests from the database. TODO: Pagination
 */
router.get("/addWashroom/getManyRequests", getManyWashroomRequests);

export default router;
