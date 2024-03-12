import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getManyWashroomRequests,
  getSingleAddWashroomRequest,
  validateAddWashroomRequest,
  validateAddBusinessRequest,
  getManyBusinessRequests,
  getSingleAddBusinessRequest,
} from "../controller/admin.controller.js";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/isAdmin", verifyToken,(req, res) => {
  res.json({ response: "Valid User" });
});

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
router.get("/addWashroom/getRequest/:id", verifyToken, getSingleAddWashroomRequest);

/**
 * Adds a new washroom into the database based on body contents and deletes
 * the corresponding washroom request.
 * Requires a nonempty body containing
 * {
 *   name: "name of washroom to be added"
 *   fullAddress: "Address, City, Province PostalCode, Country"
 * }
 */
router.post("/addWashroom/validateRequest/:id", verifyToken, validateAddWashroomRequest);

/**
 * Returns a list of washroom requests from the database. TODO: Pagination
 */
router.get("/addWashroom/getManyRequests", verifyToken, getManyWashroomRequests);


/**
 * Returns a single business from the database.
 * ":id" represents the id of the business getting fetched
 */
router.get("/addBusiness/getRequest/:id", verifyToken, getSingleAddBusinessRequest);

/**
 * Adds a new business into the database based on body contents and deletes
 * the corresponding business request.
 * Requires a nonempty body containing
 * {
 *   name: "name of business to be added"
 *   contactDetails: "Name, Email, Phone Number"
 *   fullAddress: "Address, City, Province PostalCode, Country"
 * }
 */
router.post("/addBusiness/validateRequest/:id", verifyToken, validateAddBusinessRequest);

/**
 * Returns a list of business requests from the database.
 */
router.get("/addBusiness/getManyRequests", verifyToken, getManyBusinessRequests);

export default router;
