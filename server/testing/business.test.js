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
