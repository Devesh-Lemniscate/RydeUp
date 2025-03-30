# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint allows a new user to register. It validates the input data, hashes the password using [`userModel.hashPassword`](d:/Projectss/RydeUp/Backend/models/user.model.js#L20), creates the user via [`userService.createuser`](d:/Projectss/RydeUp/Backend/services/user.service.js), and returns a JSON Web Token along with user details.

### Method
`POST`

### URL
`/users/register`

### Request Body
The request body must be in JSON format and include the following fields:

| Field                 | Type   | Required | Details                                                                     |
|-----------------------|--------|----------|-----------------------------------------------------------------------------|
| `fullname.firstName`  | String | Yes      | Minimum of 3 characters.                                                    |
| `fullname.lastName`   | String | No       | Minimum of 3 characters if provided.                                        |
| `email`               | String | Yes      | Must be a valid email address.                                              |
| `password`            | String | Yes      | Minimum of 6 characters; will be hashed before storage.                     |

#### Example Request
```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8c0e5b5d6c9a1b2c3d4e5",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "<Hashed Password>",
    "socketId": null
  }
}
```