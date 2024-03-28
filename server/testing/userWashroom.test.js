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
    const collection = db.collection(collections.ADD_WASHROOM_REQUESTS);
    await collection.deleteMany({}); //fresh clean db for each test
});

afterAll(async () => {
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
