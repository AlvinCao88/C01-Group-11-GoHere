import { Router } from "express";
import { registerUser, loginUser } from "../controller/admin.controller.js"
import { verifyToken } from "../middleware/auth.js";
import { getSingleAddWashroomRequest, validateAddWashroomRequest } from "../controller/admin.controller.js"

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
 */
router.get("/addWashroom/getRequest/:id", getSingleAddWashroomRequest)

/**
 * Adds a new washroom into the database based on body contents and deletes
 * the corresponding washroom request.
 */
router.post("/addWashroom/validateRequest", validateAddWashroomRequest)

export default router;
