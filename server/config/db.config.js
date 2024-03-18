import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

let connectionString;
if (process.env.ENV === "Docker")
  connectionString = process.env.MONGODB_URL || "mongodb://mongodb:27017";
else connectionString = process.env.MONGODB_URL || "mongodb://localhost:27017";

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
  console.log("connected to MONGODB");
} catch (e) {
  console.log(e);
}

const db = conn.db("GoHere");

export default {
  instance: db,
  collections: {
    WASHROOMS: "Washrooms",
    ADD_WASHROOM_REQUESTS: "AddWashroomRequests",
    ADMINS: "Admins",
    USER_REPORT: "UserReport"
  },
};
