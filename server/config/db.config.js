import { MongoClient } from "mongodb";
const connectionString = "mongodb://localhost:27017";

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
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
