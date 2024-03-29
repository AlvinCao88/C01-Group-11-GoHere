const { v4: uuidv4 } = require("uuid");

const SERVER_URL = "http://localhost:8000";

async function getToken() {
  const email = `${uuidv4()}@email.com`;
  const password = `${uuidv4()}`;

  const signUpRes = await fetch(`${SERVER_URL}/admin/registerUser`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      registrationId: "super secret 123",
    }),
  });

  const loginRes = await fetch(`${SERVER_URL}/admin/loginUser`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const loginResBody = await loginRes.json();
  return loginResBody.token;
}

module.exports = {
  getToken
}
