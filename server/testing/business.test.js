const SERVER_URL = "http://localhost:8000";
const { getToken } = require("./utils")

test("/admin/isAdmin", async () => {
  const token = await getToken();

  const res = await fetch(`${SERVER_URL}/admin/isAdmin`, {
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

test("/admin/addBusiness/getManyRequests - empty db", async () => {
  const token = await getToken();

  const loginRes = await fetch(
    `${SERVER_URL}/admin/addBusiness/getManyRequests`,
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

  expect(loginRes.status).toBe(404);
});

//Tests for get business request and validate business request
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const collections = {
    ADD_BUSINESS_REQUESTS: "AddBusinessRequests",
};

let client;
let db;

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

afterEach(async () => {
    const db = await connectToDatabase();
    const businessRequestCollection = db.collection(collections.ADD_BUSINESS_REQUESTS);
    await businessRequestCollection.deleteMany({}); // Fresh clean db for each test
});

afterAll(async () => {
    await insertOneBusinessRequest();
    if (client) await client.close();
});

async function insertOneBusinessRequest() {
    const db = await connectToDatabase();
    const businessRequestCollection = db.collection(collections.ADD_BUSINESS_REQUESTS);

    const requestBody = {
      businessName: "XYZ Tech Solutions",
      contactName: "Alice Smith",
      email: "alice@xyztech.com",
      phoneNumber: "9876543210",
      address: "456 Elm St",
      city: "Metropolis",
      province: "New York",
      description: "We provide innovative tech solutions for businesses.",
    };

    try {
        const result = await businessRequestCollection.insertOne(requestBody);
        return result.insertedId;
    } catch (error) {
        console.error("Error inserting test business request:", error);
        throw error;
    }
}



test("get 1 business request, proper Id", async () => {
  const token = await getToken();
  const insertedId = await insertOneBusinessRequest();

  const res = await fetch(`${SERVER_URL}/admin/addBusiness/getRequest/${insertedId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
  })

  const resBody = await res.json();
  console.log(resBody);
  expect(res.status).toBe(200);
});

test("get 1 business request, non proper Id", async () => {
  const token = await getToken();
  const insertedId = await insertOneBusinessRequest();

  //replacing the first letter of the id to have a bad id
  let badId = insertedId.toString();
  const first = badId.charAt(0);
  if (first === 'a') {
      badId = badId.replace('a', 'b');
  }
  else {
      badId = badId.replace(first, 'a');
  }

  const res = await fetch(`${SERVER_URL}/admin/addBusiness/getRequest/${badId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
  })

  const resBody = await res.json();
  expect(res.status).toBe(404);
});


// Test for validating business request dcwapi
test("/admin/validateAddBusinessRequest proper id", async () => {
  const token = await getToken(); // Assuming getToken function is defined in "./utils"

  // Assuming there is a valid ID of an add business request
  const id = await insertOneBusinessRequest(); // Await the result to get the ID

  // Real data for the University of Toronto Scarborough campus
  const requestBody = {
    businessName: "University of Toronto Scarborough",
    contactName: "Admissions Office",
    email: "admissions@utsc.edu",
    phoneNumber: "416-287-8872",
    address: "1265 Military Trail",
    city: "Toronto",
    province: "Ontario",
    description: "A prestigious university offering a wide range of undergraduate and graduate programs.",
  };

  const res = await fetch(`${SERVER_URL}/admin/addBusiness/validateRequest/${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  expect(res.status).toBe(200);
});

test("/admin/validateAddBusinessRequest with improper ID", async () => {
  const token = await getToken(); // Assuming getToken function is defined in "./utils"

  // Assuming there is an invalid ID of an add business request
  const id = "invalid-id"; // Providing an invalid ID

  // Real data for the University of Toronto Scarborough campus
  const requestBody = {
    businessName: "University of Toronto Scarborough",
    contactName: "Admissions Office",
    email: "admissions@utsc.edu",
    phoneNumber: "416-287-8872",
    address: "1265 Military Trail",
    city: "Toronto",
    province: "Ontario",
    description: "A prestigious university offering a wide range of undergraduate and graduate programs.",
  };

  // Making the fetch request
  const res = await fetch(`${SERVER_URL}/admin/addBusiness/validateRequest/${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  // Expecting the response status to be 400 because of an invalid ID
  expect(res.status).toBe(400);
});


test("/admin/validateAddBusinessRequest with bad location data", async () => {
  const token = await getToken(); // Assuming getToken function is defined in "./utils"

  // Assuming there is a valid ID of an add business request
  const id = await insertOneBusinessRequest(); // Await the result to get the ID

  // Providing location data with a bad address format
  const requestBody = {
    businessName: "XYZ Tech Solutions",
    contactName: "Alice Smith",
    email: "alice@xyztech.com",
    phoneNumber: "9876543210",
    address: "456 Elm St", // Missing city and province
    city: "Metropolis",
    province: "New York",
    description: "We provide innovative tech solutions for businesses.",
  };

  // Making the fetch request
  const res = await fetch(`${SERVER_URL}/admin/addBusiness/validateRequest/${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });

  // Expecting the response status to be 400 because of bad location data
  expect(res.status).toBe(400);
});