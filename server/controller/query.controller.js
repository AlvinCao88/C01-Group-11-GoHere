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

// module.exports = {
//   findClosestWashroomsController,
// };
