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
  openHours: TBD,
  contact: TBD
}
```

## The Backend

Structure: See [this](https://github.com/geshan/expressjs-structure) repo for more information
```
server/
  - server.js             // entry point
  - routes/               // define REST endpoints
  - controllers/          // define controllers for endpoints
  - middleware/
  - config/               // contains the `db` object and names for collections
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
