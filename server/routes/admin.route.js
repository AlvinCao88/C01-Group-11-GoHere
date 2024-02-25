import { Router } from "express";
import jwt from "jsonwebtoken";
import AdminController from "../controller/admin.controller.js";
import bcrypt from 'bcrypt';
import { Admin } from "mongodb";

const router = Router();
// Define Endpoints Here


router.post("/registerUser", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password both needed to register." });
      }
  
      const existingUser = await AdminController.getUser();
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
      }
  
      AdminController.createUser(email, password);
  
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
      res.status(201).json({ response: "User registered successfully.", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/loginUser", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password both needed to login." });
      }
  
      const user = await AdminController.getUser(email);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
        res.json({ response: "User logged in succesfully.", token: token }); 
      } else {
        res.status(401).json({ error: "Authentication failed." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;