import { Router } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../controller/admin.controller.js"
import bcrypt from "bcrypt";

const router = Router();
// Define Endpoints Here

router.post("/registerUser", registerUser)
  
router.post("/loginUser", loginUser);

router.get("/testRestrictedGetRequest", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, "secret-key", async (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized");
      }
    });

    res.status(200).json({ response: "This is a super secret message." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
