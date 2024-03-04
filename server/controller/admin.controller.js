import { ObjectId } from "mongodb";
import db from "../config/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "email-validator";

const userCollection = db.instance.collection(db.collections.ADMINS);

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

export async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password both needed to register." });
    }

    if (!validator.validate(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const existingUser = await getUser(email);
    if (existingUser) {
      return res.status(401).json({ error: "Email already exists." });
    }

    await createUser(email, password);

    const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
    return res
      .status(200)
      .json({ response: "User registered successfully.", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password both needed to login." });
    }

    const user = await getUser(email);

    if (!user) {
      return res.status(401).json({ error: "Email is not registered." });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
      return res.json({
        response: "User logged in succesfully.",
        token: token,
      });
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
export async function getSingleAddWashroomRequest(req, res) {
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
export async function validateAddWashroomRequest(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    // First check that the washroom request actually exists
    const requestCollection = db.instance.collection(
      db.collections.ADD_WASHROOM_REQUESTS,
    );
    const data = await requestCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!data)
      return res
        .status(404)
        .json({ error: "Unable to find request with given ID." });

    const { name, fullAddress } = await req.body;
    // Validate the information sent
    if (!name || !fullAddress)
      return res.status(400).json({ error: "Missing fields in body." });
    if (fullAddress.split(",").length != 4)
      return res.status(400).json({ error: "Address not of correct format." });

    // Get long/lat information from google Geocode API
    const geocodeRes = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json" +
        `?address=${name},${fullAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );

    // There may be multiple results, we select the first one for simplicity
    const { results: geocodeBody, status } = await geocodeRes.json();
    if (status !== "OK")
      return res.status(400).json({ error: "Failed to find location." });

    // Get open/close hours and contact information from google Places API
    const placesRes = await fetch(
      "https://maps.googleapis.com/maps/api/place/details/json" +
        `?place_id=${geocodeBody[0].place_id}` +
        `&fields=opening_hours,formatted_phone_number,website` +
        `&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );
    const { result: placesBody } = await placesRes.json();

    const washroomCollection = db.instance.collection(db.collections.WASHROOMS);
    const result = await washroomCollection.insertOne({
      name: name,
      fullAddress: fullAddress,
      latittude: geocodeBody[0].geometry.location.lat,
      longitude: geocodeBody[0].geometry.location.lng,
      hours:
        placesBody && placesBody.opening_hours
          ? placesBody.opening_hours.weekday_text
          : [],
      contact: {
        number: placesBody ? placesBody.formatted_phone_number : "",
        website: placesBody ? placesBody.website : "",
      },
    });

    // After successful validation, delete the request
    await requestCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.json({
      response: "Sucessfully added washroom.",
      insertedId: result.insertedId,
    });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getManyWashroomRequests(_, res) {
  try {
    const collection = db.instance.collection(
      db.collections.ADD_WASHROOM_REQUESTS,
    );

    const data = collection.find({});

    if ((await collection.countDocuments({})) === 0) {
      return res.status(404).json({ error: "There are no requests." });
    }

    res.json({ response: await data.toArray() });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}
