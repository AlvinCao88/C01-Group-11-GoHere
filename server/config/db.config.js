import { MongoClient } from "mongodb";
import 'dotenv/config'

const connectionString = process.env.MONGODB_URL;

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
    ADMINS: "Admins"
  }
}
