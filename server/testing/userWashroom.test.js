const fetch = require("node-fetch");
const SERVER_URL = "http://localhost:8000";
const { getToken } = require("./utils");
const { MongoClient } = require("mongodb");

let client;
let db;
let token;

async function connectToDatabase() {
    if (db) {
        return db;
    }

    const connectionString = "mongodb://localhost:27017";
    client = new MongoClient(connectionString);

    try {
        await client.connect();
        db = client.db("GoHere");
        return db;
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw error;
    }
}

beforeAll(async() => {
    token = await getToken();
});

afterEach(async () => {
    const db = await connectToDatabase();
    const washroomRequestCollection = db.collection(collections.ADD_WASHROOM_REQUESTS);
    await washroomRequestCollection.deleteMany({}); //fresh clean db for each test
});

afterAll(async () => {
  await insertOneWashroomRequest();
    if (client) await client.close();
});

const collections = {
    ADD_WASHROOM_REQUESTS: "AddWashroomRequests",
};


test("/admin/addWashroom/getRequest/:id - Give invalid request ID", async () => {
  const res = await fetch(
    `${SERVER_URL}/admin/addWashroom/getRequest/invalid-object-id`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  expect(res.status).toBe(400);
});

test("/admin/addWashroom/getManyRequests - Get no requests", async () => {
  const res = await fetch(`${SERVER_URL}/admin/addWashroom/getManyRequests`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  expect(res.status).toBe(404);
});

test("/admin/addWashroom/getManyRequests - Get 3 requests", async () => {
  for (let i = 0; i < 3; i++) {
    await fetch(`${SERVER_URL}/user/request/addWashroomRequest`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({
        address: "aaa",
        city: "sss",
        province: "aaaaa",
        description: "sgddsagdsg",
      }),
    });
  }

  const res = await fetch(`${SERVER_URL}/admin/addWashroom/getManyRequests`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  expect(res.status).toBe(200);
});

test("/admin/addWashroom/valdateRequest/:id - Incorrect fields in validation", async () => {
  const washroomRes = await fetch(
    `${SERVER_URL}/user/request/addWashroomRequest`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({
        address: "aaa",
        city: "sss",
        province: "aaaaa",
        description: "sgddsagdsg",
      }),
    },
  );

  const washroom = await washroomRes.json()

  const res = await fetch(`${SERVER_URL}/admin/addWashroom/validateRequest/${washroom._id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  expect(res.status).toBe(400)

});


async function insertOneWashroomRequest(){
  const db = await connectToDatabase();
  const washroomRequestCollection = db.collection(collections.ADD_WASHROOM_REQUESTS);
  const newRequest = {
    address: "Test Address",
    city: "Test City",
    province: "Test Province",
    description: "Test Description",
  };

  try {
    const result = await washroomRequestCollection.insertOne(newRequest);
    return result.insertedId;
  } catch (error) {
      console.error("Error inserting test business request:", error);
      throw error;
  }
};

test("removeSingleWashroomRequest - removing a washroom request with proper ID", async () => {
  // Insert a test washroom request
  const token = await getToken();
  const insertedId = await insertOneWashroomRequest();

  // Make a DELETE request to remove the inserted washroom request
  const res = await fetch(`${SERVER_URL}/admin/removeWashroom/${insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Check the response status and body
  const resBody = await res.json();
  console.log(resBody);
  expect(res.status).toBe(200);
});

test("removeSingleWashroomRequest - attempting to remove a washroom request with invalid ID", async () => {
  // Try to remove a washroom request with an invalid ID
  const token = await getToken();
  const invalidId = "660632b44bcbr8a2d5026e75";

  // Make a DELETE request to remove the washroom request with an invalid ID
  const res = await fetch(`${SERVER_URL}/admin/removeWashroom/${invalidId}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      
  });

  // Check the response status
  expect(res.status).toBe(400);
});

test("removeSingleWashroomRequest - attempting to remove a non-existent washroom request", async () => {
  // Try to remove a non-existent washroom request
  const token = await getToken();
  const nonExistentId = "sgdfgsdfgsdfgsdf";

  // Make a DELETE request to remove the non-existent washroom request
  const res = await fetch(`${SERVER_URL}/admin/removeWashroom/${nonExistentId}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      
  });

  // Check the response status
  expect(res.status).toBe(400);
});
