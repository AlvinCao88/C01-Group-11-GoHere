import { ObjectId } from "mongodb";
import db from "../config/db.config.js";

// Assuming there's the washrooms collection
const washroomCollection = db.instance.collection(db.collections.WASHROOMS);

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getWashroomById(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const washroom = await washroomCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!washroom) {
      return res
        .status(404)
        .json({ error: "Unable to find washroom with the given ID." });
    }

    res.json({ response: washroom });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getAllWashrooms(req, res) {
  try {
    const allWashrooms = await washroomCollection.find({}).toArray();

    if (allWashrooms.length === 0) {
      return res.status(404).json({ error: "No washrooms found." });
    }

    res.json({ response: allWashrooms });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Haversine formula to calculate the distance between two points on the Earth
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function findClosestWashrooms(userLatitude, userLongitude) {
  // Calculate distances for each washroom
  const washroomsWithDistances = washroomCollection.map((washroom) => {
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      washroom.latitude,
      washroom.longitude
    );
    return { washroom, distance };
  });

  // Sort washrooms based on distance
  washroomsWithDistances.sort((a, b) => a.distance - b.distance);

  // Extract washrooms without distances from the sorted array
  const closestWashrooms = washroomsWithDistances.map((item) => item.washroom);

  return closestWashrooms;
}

export async function findClosestWashroomsController(req, res) {
  const { userLatitude, userLongitude } = req.body;
  const closestWashrooms = findClosestWashrooms(userLatitude, userLongitude);

  res.status(200).json({ closestWashrooms });
}

module.exports = {
  findClosestWashroomsController,
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getSingleReport(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const collection = db.instance.collection(
      db.collections.USER_REPORT,
    );
    const data = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!data) {
      return res
        .status(404)
        .json({ error: "Unable to find report with given ID." });
    }
    res.json({ response: data });
  } catch (e) {
    console.error("Error in getSingleReport:", e);
    res.status(500).json({ error: `${e.message || e}` });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function getAllUserReports(_, res) {
  try {
    const collection = db.instance.collection(
      db.collections.USER_REPORT,
    );

    const data = collection.find({});

    if ((await collection.countDocuments({})) === 0) {
      return res.status(404).json({ error: "There are no reports." });
    }

    res.json({ response: await data.toArray() });
  } catch (e) {
    res.status(500).json({ error: `${e}` });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export async function verifyUserReport(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    if (!data)
      return res
        .status(404)
        .json({ error: "Unable to find report with given ID." });

    const userReportCollection = db.instance.collection(db.collections.USER_REPORT);

    // Step 1: Check if the washroom (in report) actually exists in washroom collection
    const report = await userReportCollection.findOne({ _id: new ObjectId(id) });
    if (!report) {
      return res.status(404).json({ error: "Unable to find report with given ID." });
    }
    const washroom = await washroomCollection.findOne({ fullAddress: report.washroomFullAddress });
    if (!washroom) {
      return res.status(404).json({ error: "Washroom not found for the given report." });
    }
    
    // Step 2: Verify whether the report should be approved by an admin
    const adminApproval = true; // Replace with actual logic (from frontend button) to check admin approval
    if (!adminApproval) {
      // Step 3: Delete the report that is not verified
      await userReportCollection.deleteOne({ _id: new ObjectId(id) });
      res.json({ message: "User report not verified, deleted successfully." });
    } else {
      const updatedReport = await userReportCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status: true } },
        { returnDocument: 'after' }
      );
      res.json({ message: "User report successfully verified by admin.", report: updatedReport });
    }
    } catch (e) {
      console.error("Error in verifyUserReport:", e);
      res.status(500).json({ error: `${e.message || e}` });
    }
}
