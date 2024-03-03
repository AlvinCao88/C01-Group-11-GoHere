import { Router } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../controller/admin.controller.js"
import { verifyToken } from "../middleware/auth.js";

const router = Router();
// Define Endpoints Here

router.post("/registerUser", registerUser)
  
router.post("/loginUser", loginUser);

router.get("/testRestrictedGetRequest", verifyToken, async (req, res) => {
  try {
    res.status(200).json({ response: "This is a super secret message." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
