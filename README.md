# Basic CRUD API

Basic CRUD API is a Node.js application that implements basic operations __C__ reate, __R__ ead, __U__ pdate and __D__ elete operations as Rest API for users which are stored in memory.

## Installation

Clone dev branch from current repository

## Usage

a) Open terminal in root directory of the application.
To run application in development mode use the following command:
```bash
npm run start:dev
```

b) To run application in production mode use the following command:
```bash
npm run start:prod
```

Open Postman or similar application for testing REST API

Application supports the following HTTP methods:

1) __GET__

- _/api/users_ - to get all users
- _/api/users/{userId}_ - to get certain user by his {userId}

2) __POST__

- _/api/users_ with body in the following format:

```JSON
{
  "user": {
    "username": "Alex", // string (required)
    "age": 33, // number (required)
    "hobbies": ["swimming"] // array of string or empty (required)
  }
}
```

to create new user

3) __PUT__
- _/api/users/{userId}_ - to update existing user with certain {userId}

Format of body should be the same like for POST method but we can update one or more properties by valid value:

```JSON
{
  "user": {
    "username": "Alex", // string
    "age": 33, // number
    "hobbies": ["swimming"] // array of string or empty
  }
}
```

4) __DELETE__
- _/api/users/{userId}_ - to remove existing user by {userId}

## License

[ISC](https://opensource.org/license/isc-license-txt/)
