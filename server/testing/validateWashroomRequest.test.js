const fetch = require("node-fetch");
const SERVER_URL = "http://localhost:8000";
const { getToken } = require("./utils");

test("/admin/addWashroom/getRequest/:id - Give invalid request ID", async () => {
  const token = await getToken();

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
  const token = await getToken();

  await fetch(`${SERVER_URL}/deleteAll`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
  });

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
  const token = await getToken();

  await fetch(`${SERVER_URL}/deleteAll`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
  });

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
  const token = await getToken();

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
