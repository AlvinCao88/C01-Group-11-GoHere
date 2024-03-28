const SERVER_URL = "http://localhost:8000";
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");


// This test file will test backend for user reports
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
    const res = await fetch(`${SERVER_URL}/admin/registerUser`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${uuidv4()}@email.com`,
          password: `${uuidv4()}`,
          registrationId: "super secret 123",
    })});

    const resBody = await res.json();
    if (res.ok) {
        token = resBody.token;
        console.log("token obtained");
        return;
    }
    console.log("token not obtained");
});

afterEach(async () => {
    const db = await connectToDatabase();
    const washroomCollection = db.collection(collections.USER_REPORT);
    await washroomCollection.deleteMany({}); //fresh clean db for each test
});

afterAll(async () => {
    if (client) await client.close();
});
  
const collections = {
    USER_REPORT: "UserReport",
};

async function insertOneIssue() {
    const db = await connectToDatabase();
    const issueCollection = db.collection(collections.USER_REPORT);

    const testIssue = {
        name: "test user name 1 issue",
        phoneNum: 111,
        email: "test email 1 issue",
        issue: "test issue 1 issue",
        status: false,
        washroomId: "test washroom id 1 issue"
    };

    try {
        const result = await issueCollection.insertOne(testIssue);
        return result.insertedId;
    } catch (error) {
        console.error("Error inserting test issue:", error);
        throw error;
    }
}

async function insertThreeIssue() {
    const db = await connectToDatabase();
    const issueCollection = db.collection(collections.USER_REPORT);

    const testIssue1 = {
        name: "test user name1 3 issue",
        phoneNum: 111,
        email: "test email 3 issue",
        issue: "test issue 3 issue",
        status: false,
        washroomId: "test washroom id 3 issue"
    };

    const testIssue2 = {
        name: "test user name2 3 issue",
        phoneNum: 111,
        email: "test email 3 issue",
        issue: "test issue 3 issue",
        status: false,
        washroomId: "test washroom id 3 issue"
    };

    const testIssue3 = {
        name: "test user name3 3 issue",
        phoneNum: 111,
        email: "test email 3 issue",
        issue: "test issue 3 issue",
        status: false,
        washroomId: "test washroom id 3 issue"
    }

    try {
        const result = await issueCollection.insertMany([testIssue1, testIssue2, testIssue3]);
        return result.insertedIds;
    } catch (error) {
        console.error("Error inserting test issue:", error);
        throw error;
    }
}

test("removing 1 issue, proper Id", async () => {
    const insertedId = await insertOneIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/remove/${insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(200);
});

test("removing 1 issue, non proper Id", async () => {
    const insertedId = 0;

    const res = await fetch(`${SERVER_URL}/admin/userReport/remove/${insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});

test("get 1 issue, proper Id", async () => {
    const insertedId = insertOneIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/get/${insertedId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(200);
});

test("get 1 issue, non proper Id", async () => {
    const insertedId = 0;

    const res = await fetch(`${SERVER_URL}/admin/userReport/get/${insertedId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});

test("get all issue, 3 issue in db", async () => {
    insertThreeIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(200);
});

test("get all issue, empty db", async () => {
    const res = await fetch(`${SERVER_URL}/admin/userReport/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});