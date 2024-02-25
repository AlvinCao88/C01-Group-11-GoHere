import { Router } from "express";
import jwt from "jsonwebtoken";
import AdminController from "../controller/admin.controller.js";

const router = Router();
// Define Endpoints Here


router.post("/registerUser", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Basic body request check
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password both needed to register." });
      }
  
      // Checking if username does not already exist in database
      const existingUser = await AdminController.getUser();
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
      }
  
      // Creating hashed password (search up bcrypt online for more info)
      // and storing user info in database
      AdminController.createUser(email, password)
  
      // Returning JSON Web Token (search JWT for more explanation)
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
      res.status(201).json({ response: "User registered successfully.", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;