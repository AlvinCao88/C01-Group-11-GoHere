const SERVER_URL = "http://localhost:8000";
const { v4: uuidv4 } = require("uuid");

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
