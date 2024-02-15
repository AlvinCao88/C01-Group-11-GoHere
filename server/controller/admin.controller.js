import { ObjectId } from "mongodb";
import db from "../config/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "email-validator";

const userCollection = db.instance.collection(
  db.collections.ADMINS,
);

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await userCollection.insertOne({
    email,
    password: hashedPassword,
  });
}

async function getUser(email) {
  const existingUser = await userCollection.findOne({ email });
  return existingUser;
}

export async function registerUser(req,res){
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password both needed to register." });
    }

    if(!validator.validate(email)){
      return res
        .status(400)
        .json({ error: "Invalid email format." });
    }

    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(401).json({ error: "Email already exists." });
    }

    await createUser(email, password);

    const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
    return res.status(200).json({ response: "User registered successfully.", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginUser(req, res){
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password both needed to login." });
    }

    const user = await getUser(email)

    if (!user){
      return res.status(401).json({error: "Email is not registered."})
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
      return res.json({ response: "User logged in succesfully.", token: token });
    } else {
      res.status(401).json({ error: "Password was incorrect." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getSingleAddWashroomRequest(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const collection = db.instance.collection(
      db.collections.ADD_WASHROOM_REQUESTS,
    );
    const data = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!data) {
      return res
        .status(404)
        .json({ error: "Unable to find request with given ID." });
    }
    res.json({ response: data });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function validateAddWashroomRequest(req, res) {
  
}

export { 
  registerUser,
  loginUser,
  getSingleAddWashroomRequest,
  validateAddWashroomRequest,
};
