import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  getManyWashroomRequests,
  getSingleAddWashroomRequest,
  validateAddWashroomRequest,
  removeSingleWashroomRequest,
  validateAddBusinessRequest,
  getManyBusinessRequests,
  getSingleAddBusinessRequest,
  removeSingleBusinessRequest,
  verifyUserReport,
  getAllUserReports,
  getSingleReport,
  removeSingleReport,
} from "../controller/admin.controller.js";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.get("/isAdmin", verifyToken, (req, res) => {
  res.json({ response: "Valid User" });
});


/**
 * Returns a single washroom request from the database.
 * ":id" represents the id of the washroom getting fetched
 */
router.get(
  "/addWashroom/getRequest/:id",
  verifyToken,
  getSingleAddWashroomRequest,
);

/**
 * Adds a new washroom into the database based on body contents and deletes
 * the corresponding washroom request.
 * Requires a nonempty body containing
 * {
 *   name: "name of washroom to be added"
 *   fullAddress: "Address, City, Province PostalCode, Country"
 * }
 */
router.post(
  "/addWashroom/validateRequest/:id",
  verifyToken,
  validateAddWashroomRequest,
);

/**
 * Returns a list of washroom requests from the database.
 */
router.get(
  "/addWashroom/getManyRequests",
  verifyToken,
  getManyWashroomRequests,
);

/**
 *  Removes a washroom from the ADD_BUSINESS_REQUESTS collection
 */
router.delete("/removeWashroom/:id", removeSingleWashroomRequest);

/**
 * Returns a single business from the database.
 * ":id" represents the id of the business getting fetched
 */
router.get(
  "/addBusiness/getRequest/:id",
  verifyToken,
  getSingleAddBusinessRequest,
);

/**
 * Adds a new business into the database based on body contents and deletes
 * the corresponding business request.
 * Requires a nonempty body containing
 * {
 *   name: "name of business to be added"
 *   contactDetails: "Business Name, Contact Name, Email, Phone Number"
 *   fullAddress: "Address, City, Province PostalCode, Country"
 * }
 */
router.post(
  "/addBusiness/validateRequest/:id",
  verifyToken,
  validateAddBusinessRequest,
);

/**
 * Returns a list of business requests from the database.
 */
router.get(
  "/addBusiness/getManyRequests",
  verifyToken,
  getManyBusinessRequests,
);

/**
 *  Removes a business from the ADD_BUSINESS_REQUESTS collection
 */
router.delete("/removeBusiness/:id", verifyToken, removeSingleBusinessRequest);

router.delete("/userReport/remove",verifyToken, removeSingleReport);
router.get('/userReport/get/:id', verifyToken, getSingleReport);
router.get('/userReport/getAll', verifyToken, getAllUserReports);
router.put('/userReport/validateRequest/:id', verifyToken, verifyUserReport);

export default router;
