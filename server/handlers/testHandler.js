import db from "../config/conn.js";

export const testHandlerFunc1 = (_, res) => {
  res.json({ hello: "world" });
};

export const testHandlerFunc2 = async (_, res) => {
  // If we want to use db
  try {
    await db.dropDatabase();
  } catch (_) {
    console.log("test");
  }
  res.json({ world: "hello" });
};
