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

## Endpoint: `/users/login`

### Description
This endpoint allows an existing user to log in. It validates the provided email and password, verifies the user credentials, and returns a JSON Web Token along with the user details upon successful authentication.

### Method
`POST`

### URL
`/users/login`

### Request Body
The request body must be in JSON format and include the following fields:

| Field    | Type   | Required | Details                                                                  |
|----------|--------|----------|--------------------------------------------------------------------------|
| `email`  | String | Yes      | Must be a valid email address.                                           |
| `password`| String| Yes      | Minimum of 6 characters; must match the stored user password.            |

#### Example Request
```json
{
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

## Endpoint: `/users/profile`

### Description
This endpoint retrieves the profile of the authenticated user. It requires a valid JSON Web Token, which can be provided in the `Authorization` header or as a cookie.

### Method
`GET`

### URL
`/users/profile`

### Authentication
Requires a valid token either via the `Authorization` header (as `Bearer <token>`) or a cookie named `token`.

### Example Request
_No request body is required._

#### Example Response
```json
{
  "user": {
    "_id": "64f8c0e5b5d6c9a1b2c3d4e5",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

## Endpoint: `/users/logout`

### Description
This endpoint logs out the authenticated user by clearing the authentication cookie and blacklisting the token. It ensures that the token cannot be reused for subsequent requests.

### Method
`GET`

### URL
`/users/logout`

### Authentication
Requires a valid token either via the `Authorization` header or a cookie named `token`.

### Example Request
_No request body is required._

#### Example Response
```json
{
  "message": "Logged out successfully"
}
```