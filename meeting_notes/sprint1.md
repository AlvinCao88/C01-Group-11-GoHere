

## Database Schema

```javascript
USER_ADD_WASHROOM_REQUEST {
  id: uuid,
  address: string,
  city: string,
  province: string,
  image: image,
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
