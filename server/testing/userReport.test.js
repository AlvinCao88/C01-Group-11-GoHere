const SERVER_URL = "http://localhost:8000";
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { getToken } = require("./utils");


// This test file will test backend for user reports
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
    const washroomCollection = db.collection(collections.USER_REPORT);
    await washroomCollection.deleteMany({}); //fresh clean db for each test
});

afterAll(async () => {
    insertOneIssue();
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
    const token = await getToken();
    const insertedId = await insertOneIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/remove/${insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(200);
});

test("removing 1 issue, non proper Id", async () => {
    const token = await getToken();
    const insertedId = await insertOneIssue();
    
    //replacing the first letter of the id to have a bad id
    let badId = insertedId.toString();
    const first = badId.charAt(0);
    if (first === 'a') {
        badId = badId.replace('a', 'b');
    }
    else {
        badId = badId.replace(first, 'a');
    }

    const res = await fetch(`${SERVER_URL}/admin/userReport/remove/${badId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});

test("get 1 issue, proper Id", async () => {
    const token = await getToken();
    const insertedId = await insertOneIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/get/${insertedId}`, {
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

test("get 1 issue, non proper Id", async () => {
    const token = await getToken();
    const insertedId = await insertOneIssue();

    //replacing the first letter of the id to have a bad id
    let badId = insertedId.toString();
    const first = badId.charAt(0);
    if (first === 'a') {
        badId = badId.replace('a', 'b');
    }
    else {
        badId = badId.replace(first, 'a');
    }

    const res = await fetch(`${SERVER_URL}/admin/userReport/get/${badId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});

test("get all issue, 3 issue in db", async () => {
    const token = await getToken();
    insertThreeIssue();

    const res = await fetch(`${SERVER_URL}/admin/userReport/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(200);
});

test("get all issue, empty db", async () => {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/admin/userReport/getAll`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const resBody = await res.json();
    expect(res.status).toBe(404);
});