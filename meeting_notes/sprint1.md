## Getting Started

Create a branch for your feature name according to Gitflow conventions (`feat/...`) and branch it off of the `dev` branch. Do not commit directly to `main`.

## Database Schema

```javascript
USER_ADD_WASHROOM_REQUEST {
  id: uuid,
  address: string,
  city: string,
  province: string,
  description: string
}
```

```javascript
WASHROOM {
  id: uuid,
  name: string,
  fullAddress: string,
  latitude: float,
  longitude: float,
  hours: {           // two 7 index parallel arrays. Index `0` is Sunday
    open: [],
    close: []
  },
  contact: {
    website: string,
    number: string
  }
}
```

## The Backend

Structure: See [this](https://github.com/geshan/expressjs-structure) repo for more information. We only really need to care about `routes/` and `controllers/`.

```
server/
  - server.js             // entry point
  - routes/               // define REST endpoints
  - controllers/          // define controllers for endpoints
  - middleware/
  - config/               // contains the `db` object and names for collections
```

To run the backend, run `npm run dev` (for nodemon hot reloading). You also have to run your mongodb
database if you are developing locally. I created a couple files and defined a general outline for the backend this sprint.

- The `routes/admin.route.js` and `controllers/admin.controller.js` files are for admin activities (stories 7,8,9)
- The `routes/query.route.js` and `controllers/query.controller.js` files are for getting information on washrooms (stories 1, 2, 3)
- The `routes/addition.route.js` and `controllers/addition.controller.js` files are for users/businesses to requests changes/additions to be made to washrooms (story 4)
- The `config/db.config.js` file contains the database object we need when interacting with mongodb. It also contains the names of the collections. Simply import this file when you need to.

```javascript
import db from "./config/db.config.js";
```

## React Native

As discussed in first meeting:

```
App.js
src/
    - components/
    - assets/
    - screens/
```

For UI and design decisions, refer to how the current app looks like.

## React frontend

Similar structure to the react native app.

```
App.js
src/
    - components/
    - assets/
    - pages/
```

## Testing

Since everyone is busy over reading week, I say we don't do this part for sprint 1. However, for those who are creating backend endpoints, please **document your endpoint**. For now, document using comments above the route receiver. Include

- What the endpoint does
- If the endpoint requires a `body`, `url params` or other data, please specify it
