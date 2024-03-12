import dbConfig from "../config/db.config.js";

// This end point is used to add user-requested washrooms into the data base for user requested washrooms.
// It needs a body. The body should have the following format:
// USER_ADD_WASHROOM_REQUEST {
//  id: uuid, (provided automatically by mongodb)
//  address: string,
//  city: string,
//  province: string,
//  description: string
//}
//It should be in raw JSON
//no url params are needed.

export const addWashroomRequest = async (req, res) => {
  const { address, city, province, description } = req.body;

  const newRequest = {
    address,
    city,
    province,
    description,
  };

  try {
    const collection = dbConfig.instance.collection(
      dbConfig.collections.ADD_WASHROOM_REQUESTS
    );
    await collection.insertOne(newRequest);
    res
      .status(200)
      .json({ message: "Washroom request added successfully" });
  } catch (error) {
    console.error("Failed to add washroom request:", error);
    res.status(500).json({ message: "Failed to add washroom request" });
  }
};

export const addBusinessRequest = async (req, res) => {
  const { businessName, contactName, email, phoneNumber, address, city, province, description } = req.body;

  const newRequest = {
    businessName,
    contactName,
    email,
    phoneNumber,
    address,
    city,
    province,
    description,
  };

  try {
    const collection = dbConfig.instance.collection(
      dbConfig.collections.ADD_BUSINESS_REQUESTS
    );
    await collection.insertOne(newRequest);
    res
      .status(200)
      .json({ message: "Business request added successfully" });
  } catch (error) {
    console.error("Failed to add business request:", error);
    res.status(500).json({ message: "Failed to add business request" });
  }
};