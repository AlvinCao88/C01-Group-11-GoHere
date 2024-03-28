const SERVER_URL = "http://localhost:8000";
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let client;
let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  const connectionString =
    process.env.MONGODB_URL || "mongodb://localhost:27017";
  client = new MongoClient(connectionString);

  try {
    await client.connect();
    db = client.db("GoHere");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
}

afterAll(async () => {
  if (client) await client.close();
});

const collections = {
  WASHROOMS: "Washrooms",
};

async function insertWashrooms(washrooms) {
  const db = await connectToDatabase();
  const washroomCollection = db.collection(collections.WASHROOMS);
  await washroomCollection.deleteMany({});
  if (washrooms.length > 0) {
    const result = await washroomCollection.insertMany(washrooms);
    return result.insertedIds;
  } else {
    console.log("No washrooms to add.");
  }
}

async function insertTestWashroom() {
  const db = await connectToDatabase();
  const washroomCollection = db.collection(collections.WASHROOMS);
  await washroomCollection.deleteMany({});

  const testWashroomData = {
    name: "Test Washroom",
    fullAddress: "123 Test Street, Test City, TC 12345",
  };

  try {
    const result = await washroomCollection.insertOne(testWashroomData);
    console.log(`A new washroom was added with the id ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting test washroom:", error);
    throw error;
  }
}

test("Good washroom ID", async () => {
  const washroomId = await insertTestWashroom();
  const response = await fetch(
    `${SERVER_URL}/user/query/washrooms/${washroomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  expect(data.response.name).toBe("Test Washroom");
});

test("Invalid ID format", async () => {
  const response = await fetch(`${SERVER_URL}/user/query/washrooms/123`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.status).toBe(400);
});

test("Non existent washroom ID", async () => {
  const response = await fetch(
    `${SERVER_URL}/user/query/washrooms/507f1f77bcf86cd799439012`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  expect(response.status).toBe(404);
});

test("Query matches one", async () => {
  await insertWashrooms([
    {
      name: "Test Washroom",
      fullAddress: "123 Test Street, Test City, TC 12345",
    },
  ]);
  const response = await fetch(`${SERVER_URL}/user/query/washroomSearch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "Test Washroom" }),
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.response).toBeInstanceOf(Array);
  expect(data.response.length).toBe(1);
});

test("Query has no matches", async () => {
  await insertWashrooms([
    {
      name: "Test Washroom",
      fullAddress: "123 Test Street, Test City, TC 12345",
    },
  ]);
  const response = await fetch(`${SERVER_URL}/user/query/washroomSearch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "Nonexistent Washroom" }),
  });
  const data = await response.json();

  expect(response.status).toBe(404);
  expect(data.error).toBe("No washrooms found matching the text.");
});

test("Search returns both washrooms with common text", async () => {
  await insertWashrooms([
    {
      name: "Common Test Washroom 1",
      fullAddress: "456 Common Street, Test City, TC 12345",
    },
    {
      name: "Common Test Washroom 2",
      fullAddress: "789 Common Street, Test City, TC 12345",
    },
  ]);

  const response = await fetch(`${SERVER_URL}/user/query/washroomSearch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "Common Test Washroom" }),
  });
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data.response).toBeInstanceOf(Array);
  expect(data.response.length).toBe(2);
});

test("No washrooms in database", async () => {
  await insertWashrooms([]);
  const response = await fetch(`${SERVER_URL}/user/query/washrooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  expect(response.status).toBe(404);
  expect(data.error).toBe("No washrooms found.");
});

test("1 washroom in database", async () => {
  await insertWashrooms([
    {
      name: "Test Washroom",
      fullAddress: "123 Test Street, Test City, TC 12345",
      latitude: 40.7128,
      longitude: -74.006,
    },
  ]);
  const response = await fetch(`${SERVER_URL}/user/query/washrooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.response).toBeInstanceOf(Array);
  expect(data.response.length).toBe(1);
});

test("2 washroom in database", async () => {
  await insertWashrooms([
    {
      name: "Test Washroom One",
      fullAddress: "123 Test Lane, Test City, TC 12345",
    },
    {
      name: "Test Washroom Two",
      fullAddress: "456 Test Avenue, Test City, TC 12345",
    },
    {
      name: "Test Washroom Three",
      fullAddress: "789 Test Boulevard, Test City, TC 12345",
    },
  ]);

  const response = await fetch(`${SERVER_URL}/user/query/washrooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data.response).toBeInstanceOf(Array);
  expect(data.response.length).toBe(3);
});
