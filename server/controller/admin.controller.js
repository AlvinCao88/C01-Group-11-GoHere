import dbConfig from "../config/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userCollection = dbConfig.instance.collection(
  dbConfig.collections.ADMINS,
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

    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(401).json({ error: "Email already exists." });
    }

    createUser(email, password);

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

    const user = await getUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
      return res.json({ response: "User logged in succesfully.", token: token });
    } else {
      res.status(401).json({ error: "Authentication failed." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {}
















