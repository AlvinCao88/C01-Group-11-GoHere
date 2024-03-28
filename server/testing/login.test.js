const fetch = require('node-fetch')
const SERVER_URL = "http://localhost:8000"
const { v4: uuidv4 } = require('uuid');

/* 
    Endpoint testing
*/

test('/admin/registerUser - valid registration of user with password, email, valid registration id', async () => {
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
          registrationId: "super secret 123"
        }),
      });
    
      const resBody = await res.body;

    expect(res.status).toBe(200);
})


test('/admin/registerUser - Register user with password, email, invalid registration id', async () => {
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
          registrationId: "wrong id"
        }),
      });
    
      const resBody = await res.body;

    expect(res.status).toBe(401);
})

test('/admin/registerUser - Register, invalid email, wrong password', async () => {
    const res = await fetch(`${SERVER_URL}/admin/registerUser`, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${uuidv4()}@email.c@om`,
          password: `${uuidv4()}`,
          registrationId: "super secret 123"
        }),
      });
    
      const resBody = await res.body;

    expect(res.status).toBe(400);
})

test('/admin/loginUser - Login email doesnt exist', async () => {
    const email = `${uuidv4()}@email.com`;
    const password =`${uuidv4()}`;

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

    expect(loginRes.status).toBe(401);
})

test('/admin/loginUser - Login correctly', async () => {
    const email = `${uuidv4()}@email.com`;
    const password =`${uuidv4()}`;

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

    expect(loginRes.status).toBe(200);
})


test('/admin/loginUser - Login wrong password', async () => {
    const email = `${uuidv4()}@email.com`;
    const password =`${uuidv4()}`;

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
          password: "123",
        }),
      });

    expect(loginRes.status).toBe(401);
})